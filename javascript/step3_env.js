if (typeof module !== 'undefined') {
    var readline = require('./node_readline');
    var printer = require('./printer');
    var reader = require('./reader.js');
    var types = require('./types.js');
    var primitives = require('./primitives.js');
    var env = require('./environment.js');
};


var base_env = {'+': new types.FunctionType(primitives.S7_add),
                '-': new types.FunctionType(primitives.S7_subtract),
                '*': new types.FunctionType(primitives.S7_multiply),
                '/': new types.FunctionType(primitives.S7_divide)};

// list of functions and settings that the environment starts with
repl_env = new env.Environment(env=base_env);

function eval_ast(ast, env) {
    if(ast instanceof types.SymbolType) {
        // either the symbol exists - return it
        // or raise SymbolNotFoundException
        return env.get(ast.value);
    }
    else if(ast instanceof types.ListType) {
        // evaluate all items
        var items = ast.value.map(function(e) { return EVAL(e, env); });
        return new types.ListType(items);
    }
    // nothing matched, just return the ast value
    return ast;
};

// read
function READ(str) {
    return reader.read_str(str);
}

function def_form(args, env) {
    // args is a JS list
    // first arg - key, second argument - value
    primitives.check_total_args(args, min=2, max=2);
    eval_param = EVAL(args[1], env);
    env.set(args[0].value, eval_param);
    // return the value we got
    return eval_param;
};

function let_form(args, env) {
    // args is a JS list
    // create a new environment using the current as the outer
    primitives.check_total_args(args, 2, 2);
    // the first arg must be a list of even value
    if(!(args[0] instanceof types.ListType)) {
        throw new types.SyntaxErrorException('First argument is not a list in let!');
    }
    if(args[0].value.length % 2 != 0) {
        throw new types.SyntaxErrorException('First list must be even in let! form');
    }
    var new_env = env.get_child();
    // now we go through 2 at a time, adding to our new environment
    var env_set = args[0].value
    var index = 0;
    while(index < env_set.length) {
        new_env.set(env_set[index].value, env_set[index + 1]);
        index += 2
    }
    // finally, call EVAL using this new environment
    console.log(args[1]);
    return EVAL(args[1], new_env);
};

// eval
function EVAL(ast, env) {
    // list or not a list?
    if(ast instanceof types.ListType) {
        // empty or has something?
        if(ast.value.length == 0) {
            return ast;
        }
        // handle def! and let*
        var func = ast.first()
        if(func.match_symbol('def!')) {
            return def_form(ast.rest(), env);
        }
        if(func.match_symbol('let*')) {
            return let_form(ast.rest(), env);
        }
        // no, call the function
        var new_list = eval_ast(ast, env);
        // first one is the function, rest are the arguments
        // null is the implied environment, or this
        return new_list.first().value(new_list.rest());
    }
    // not a list
    return eval_ast(ast, env);
};

// print
function PRINT(exp) {
    return printer.print_str(exp);
}

// repl functions
function re(str) { 
    return EVAL(READ(str), {});
};

function rep(str) {
    return PRINT(EVAL(READ(str), repl_env));
};

function display_exception(exc) {
    if (exc instanceof types.BlankTokenException) { 
        // do nothing
        return;
    }
    if (exc.stack) { 
        printer.println(exc.stack); 
    }
    else { 
        printer.println(exc); 
    }
};

// repl loop
if (typeof require !== 'undefined' && require.main === module) {
    // Synchronous node.js commandline mode
    console.log('Scheme7 v0.1');
    while (true) {
        var line = readline.readline('user> ');
        if (line === null) { 
            break; }
        if(line === 'quit') {
            return;
        }
        try {
            if (line) { 
                printer.println(rep(line)); }
        } 
        catch (exc) 
        {
            display_exception(exc);
        }
    }
};

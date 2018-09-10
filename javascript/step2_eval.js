if (typeof module !== 'undefined') {
    var readline = require('./node_readline');
    var printer = require('./printer');
    var reader = require('./reader.js');
    var types = require('./types.js');
    var primitives = require('./primitives.js');
}


// list of functions and settings that the environment starts with
repl_env = {'+': new types.FunctionType(primitives.S7_add),
            '-': new types.FunctionType(primitives.S7_subtract),
            '*': new types.FunctionType(primitives.S7_multiply),
            '/': new types.FunctionType(primitives.S7_divide)};

function eval_ast(ast, env) {
    if(ast instanceof types.SymbolType) {
        // either the symbol exists - return it
        // or raise SymbolNotFoundException
        if(env.hasOwnProperty(ast.value)) {
            return env[ast.value];
        }
        // not found
        throw new types.SymbolNotFoundException('"' + ast.value + '" not found');
    }
    else if(ast instanceof types.ListType) {
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

// eval
function EVAL(ast, env) {
    // list or not a list?
    if(ast instanceof types.ListType) {
        // empty or has something?
        if(ast.value.length == 0) {
            return ast;
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

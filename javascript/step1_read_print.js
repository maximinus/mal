if (typeof module !== 'undefined') {
    var readline = require('./node_readline');
    var printer = require('./printer');
    var reader = require('./reader.js')
}

// read
function READ(str) {
    return reader.read_str(str);
}

// eval
function EVAL(ast, env) {
    return ast;
}

// print
function PRINT(exp) {
    return printer.print_str(exp);
}

// repl functions
function re(str) { 
    return EVAL(READ(str), {});
};

function rep(str) {
    return PRINT(EVAL(READ(str), {}));
};

function display_exception(exc) {
    if (exc instanceof reader.BlankTokenException) { 
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
        var line = readline.readline("user> ");
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

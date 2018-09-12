// Node vs browser behavior
var primitives = {};
if (typeof module !== 'undefined') {
    var types = require('./types');
} else {
    var exports = primitives;
}

function check_total_args(args, min, max=-1) {
    // args is a javascript list
    if(args.length < min) {
        throw new types.NotEnoughArgumentsException();
    }
    if((max != -1) && (args.length > max)) { 
        throw new types.TooManyArgumentsException();
    }
};

function check_arg_type(args, arg_type) {
    // args is a javascript list
    for(var i of args) {
        if(!(i instanceof arg_type)) {
            throw new types.WrongTypeException('Expected ' + arg_type);
        }
    }
};

// assume integers at this point
function S7_add(args) {
    // need 2 or more args
    check_total_args(args, 2);
    check_arg_type(args, types.IntegerType);
    // sum all the values
    var values = args.map(function (e) { return e.value; });
    var sum = values.reduce((a, b) => a + b, 0);
    return(new types.IntegerType(sum));
};

function S7_subtract(args) {
    check_total_args(args, 2);
    check_arg_type(args, types.IntegerType);
    var values = args.slice(1).map(function (e) { return e.value; });
    var sum = values.reduce((a, b) => a + b, 0);
    return(new types.IntegerType(args[0].value - sum));
};

function S7_multiply(args) {
    check_total_args(args, 2);
    check_arg_type(args, types.IntegerType);
    var values = args.map(function (e) { return e.value; });
    var sum = values.reduce((a, b) => a * b);
    return(new types.IntegerType(sum));;
};

function S7_divide(args) {
    check_total_args(args, 2);
    check_arg_type(args, types.IntegerType);
    var values = args.slice(1).map(function (e) { return e.value; });
    var dividend = args[0].value;
    for(var i of values) {
        if(i == 0) {
            throw new types.DivisionByZeroException();
        };
        dividend = Math.trunc(dividend / i);
    }
    return(new types.IntegerType(dividend));
};


function S7_prn(args) {
    // call pr_str on the first parameter with print_readably set to true, prints the result to the screen and then return nil. 
};

function S7_list(args) {
    // take the parameters and return them as a list.
};

function S7_list_p(args) {
    // ?return true if the first parameter is a list, false otherwise.
};

function S7_empty_p(args) {
    // treat the first parameter as a list and return true if the list is empty and false if it contains any elements.
};

function S7_count(args) {
    // treat the first parameter as a list and return the number of elements that it contains.

function S7_equal(args) {
    // pass
};

function S7_less_than(args) {
    // pass
};

function S7_less_or_equal(args) {
    // pass
};

function S7_greater_than(args) {
    // pass
};

function S7_greater_than_or_equal(args) {
    // pass
}

// Exports
exports.S7_add = primitives.S7_add = S7_add;
exports.S7_subtract = primitives.S7_subtract = S7_subtract;
exports.S7_multiply = primitives.S7_multiply = S7_multiply;
exports.S7_divide = primitives.S7_divide = S7_divide;

exports.check_total_args = primitives.check_total_args = check_total_args
exports.check_arg_type = primitives.check_arg_type = check_arg_type

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

// Exports
exports.S7_add = primitives.S7_add = S7_add;
exports.S7_subtract = primitives.S7_subtract = S7_subtract;
exports.S7_multiply = primitives.S7_multiply = S7_multiply;
exports.S7_divide = primitives.S7_divide = S7_divide;

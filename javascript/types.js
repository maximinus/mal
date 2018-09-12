// Node vs browser behavior
var types = {};
if (typeof module === 'undefined') {
    var exports = types;
};

// exceptions
function BlankTokenException(msg='') {};
function NoStartException(msg='') {};
function NoEndException(msg='') {};
function DivisionByZeroException(msg='') {};
function SymbolNotFoundException(msg='') {};
function ListIndexException(msg='') {};
function NotEnoughArgumentsException(msg='') {};
function TooManyArgumentsException(msg='') {};
function WrongTypeException(msg='') {};
function SyntaxErrorException(msg='') {};

// types
class S7Type {
    constructor(value=null) {
        this.value = value;
    };

    toString() {
        return 'RootType';
    };

    match_symbol(sym) {
        return false;
    };

    as_bool() {
        return true;
    };
};

class ListType extends S7Type {
    constructor(value=[]) {
        super(value);
    };

    first() {
        // return the first item or raise an error
        if(this.value.length < 1) {
            throw new ListIndexException('0');
        }
        return this.value[0];
    };

    rest() {
        // return a list of all but the first, or raise an error
        if(this.value.length < 2) {
            throw new ListIndexException('1');
        }
        return this.value.slice(1);
    };

    append(item) {
        this.value.push(item);
    };

    toString() {
        var str = this.value.map(function(e) { return e.toString(); });
        return 'List(' + str.join(', ') + ')';
    };

    length() {
        return this.values.length;
    };
};

class IntegerType extends S7Type {
    constructor(value=0) {
        super(value);
    };

    toString() {
        return this.value.toString();
    };
};

class BoolType extends S7Type {
    constructor(value=true) {
        super(value);
    };

    toString() {
        if(this.value == true) {
            return "true";
        }
        return "false";
    };

    as_bool() {
        return this.value;
    };
}

class NilType extends S7Type {
    constructor(value) {
        super(value);
    };

    toString() {
        return 'nill';
    };

    as_bool() {
        return false;
    };
};

class SymbolType extends S7Type {
    constructor(value) {
        super(value);
    };

    toString() {
        return this.value;
    };

    match_symbol(sym) {
        if(sym === this.value) {
            return true;
        }
        return false;
    }
};

class FunctionType extends S7Type {
    constructor(value) {
        super(value);
    };

    toString() {
        // you can use this.value.name
        this.value(new IntegerType(5));
        return '#<function>';
    };
};

// Exports
exports.S7Type = types.S7Type = S7Type;
exports.ListType = types.ListType = ListType;
exports.IntegerType = types.IntegerType = IntegerType;
exports.SymbolType = types.SymbolType = SymbolType;
exports.FunctionType = types.FunctionType = FunctionType;
exports.BoolType = types.BoolType = BoolType;

exports.BlankTokenException = types.BlankTokenException = BlankTokenException
exports.NoStartException = types.NoStartException = NoStartException
exports.NoEndException = types.NoEndException = NoEndException
exports.DivisionByZeroException = types.DivisionByZeroException = DivisionByZeroException
exports.SymbolNotFoundException = types.SymbolNotFoundException = SymbolNotFoundException
exports.ListIndexException = types.ListIndexException = ListIndexException
exports.NotEnoughArgumentsException = types.NotEnoughArgumentsException = NotEnoughArgumentsException
exports.TooManyArgumentsException = types.TooManyArgumentsException = TooManyArgumentsException
exports.WrongTypeException = types.WrongTypeException = WrongTypeException
exports.SyntaxErrorException = types.SyntaxErrorException = SyntaxErrorException

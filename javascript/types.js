// Node vs browser behavior
var types = {};
if (typeof module === 'undefined') {
    var exports = types;
};

class S7Type {
    constructor(value=null) {
        this.value = value;
    };

    toString() {
        return 'RootType';
    };
};

class ListType extends S7Type {
    constructor(value=[]) {
        super(value);
    };

    first() {
        // return the first item or raise an error
        if(this.value.length < 1) {
            throw types.ListIndexException('0');
        }
        return this.value[0];
    };

    rest() {
        // return a list of all but the first, or raise an error
        if(this.value.length < 2) {
            throw types.ListIndexexception('1');
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
};

class IntegerType extends S7Type {
    constructor(value=0) {
        super(value);
    };

    toString() {
        return this.value.toString();
    };
};

class SymbolType extends S7Type {
    constructor(value) {
        super(value);
    };

    toString() {
        return this.value;
    };
};

class FunctionType extends S7Type {
    constructor(value) {
        super(value);
    };

    toString() {
        return this.value.name + '()';
    };
};

// exceptions
function BlankTokenException(msg='') {};
function NoStartException(msg='') {};
function NoEndException(msg='') {};
function DivisionByZeroException(msg='') {};
function SymbolNotFoundException(msg='') {};
function ListindexException(msg='') {};
function NotEnoughArgumentsException(msg='') {};
function TooManyArgumentsException(msg='') {};
function WrongTypeException(msg='') {};

// Exports
exports.S7Type = types.S7Type = S7Type;
exports.ListType = types.ListType = ListType;
exports.IntegerType = types.IntegerType = IntegerType;
exports.SymbolType = types.SymbolType = SymbolType;
exports.FunctionType = types.FunctionType = FunctionType;

exports.BlankTokenException = types.BlankTokenException = BlankTokenException
exports.NoStartException = types.NoStartException = NoStartException
exports.NoEndException = types.NoEndException = NoEndException
exports.DivisionByZeroException = types.DivisionByZeroException = DivisionByZeroException
exports.SymbolNotFoundException = types.SymbolNotFoundException = SymbolNotFoundException
exports.ListindexException = types.ListindexException = ListindexException
exports.NotEnoughArgumentsException = types.NotEnoughArgumentsException = NotEnoughArgumentsException
exports.TooManyArgumentsException = types.TooManyArgumentsException = TooManyArgumentsException
exports.WrongTypeException = types.WrongTypeException = WrongTypeException

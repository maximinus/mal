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
        return "RootType";
    };
};

class ListType extends S7Type {
    constructor(value=[]) {
        super(value);
    };

    append(item) {
        this.value.push(item);
    };

    toString() {
        return "[]";
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

// Exports
exports.S7Type = types.S7Type = S7Type;
exports.ListType = types.ListType = ListType;
exports.IntegerType = types.IntegerType = IntegerType;
exports.SymbolType = types.SymbolType = SymbolType;

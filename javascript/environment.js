var env = {};
if (typeof module !== 'undefined') {
    var types = require('./types');
} else {
    var exports = env;
}

class Environment {
    constructor(env={}, outer=null, binds=null, exprs=null) {
        this.outer = outer;
        this.data = env;
        if(binds != null) {
            this.set_bindings(binds, exprs);
        }
    };

    set_bindings(binds, exprs) {
        if(exprs == null) {
            throw new types.NotEnoughArgumentsException('No exprs with binds');
        }
        if(binds.length != exprs.length) {
            throw new types.NotEnoughArgumentsException('Binds.length != Exprs.length');
        }
        for(var i=0; i<binds.length; i++) {
            this.set(binds[i], exprs[i]);
        }
    };

    set(key, value) {
        this.data[key] = value;
    };

    find(key) {
        if(this.data.hasOwnProperty(key)) {
            return this.data;
        }
        if(this.outer != null) {
            return this.outer.find(key);
        }
        // nothing found
        return null;
    };

    get(key) {
        var value = this.find(key)
        // if null, we went up the entire chain!
        if(value == null) {
            throw new types.SymbolNotFoundException(key);
        }
        return value[key];
    };

    get_child(binds=null, exprs=null) {
        return new Environment({}, this, binds, exprs);
    };
};

exports.Environment = env.Environment = Environment

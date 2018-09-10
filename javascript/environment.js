var env = {};
if (typeof module !== 'undefined') {
    var types = require('./types');
} else {
    var exports = env;
}

class Environment {
    constructor(env={}, outer=null) {
        this.outer = outer;
        this.data = env;
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
            throw new types.SymbolNotFoundException(key.toString());
        }
        return value[key];
    };

    get_child() {
        return new Environment({}, this);
    };
};

exports.Environment = env.Environment = Environment

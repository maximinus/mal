var env = {};
if (typeof module !== 'undefined') {
    var types = require('./types');
} else {
    var exports = env;
}


class Environment {
    constructor(outer) {
        this.outer = outer;
        this.data = {};
    };

    set(key, value) {}
};

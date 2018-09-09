// Node vs browser behavior
var printer = {};
if (typeof module !== 'undefined') {
    var types = require('./types');
};

function print_str(obj) {
    if(obj instanceof types.ListType) {
        var list_string = obj.value.map(function(e) { return print_str(e); });
        return '(' + list_string.join(' ') + ')';
    }
    // must be a normal object
    return obj.toString();
};

function println(msg) {
    console.log(msg);
};

exports.print_str = printer.print_str = print_str;
exports.println = printer.println = println;

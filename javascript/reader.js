var reader = {};
if (typeof module !== 'undefined') {
    var types = require('./types');
} else {
    var exports = reader;
}

class Reader {
    // store a list of tokens and return them 1 at a time
    constructor(tokens) {
        this.tokens = tokens;
        this.index = 0;
    };

    next() {
        // return the next token and move on
        return this.tokens[this.index++];
    };

    peek() {
        // return the current token
        return this.tokens[this.index];
    };
};

function tokenize(str) {
    var re = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g;
    var results = [];
    while ((match = re.exec(str)[1]) != '') {
        if (match[0] === ';') 
        { 
            continue;
        }
        results.push(match);
    }
    return results;
};

function read_form(reader) {
    var token = reader.peek();
    switch (token) {
        // list
        case '(':
            return read_list(reader);
        // atom
        default:  return read_atom(reader);
    }
}

function read_str(str) {
    var tokens = tokenize(str);
    if(tokens.length === 0) {
        throw new types.BlankTokenException();
    }
    return read_form(new Reader(tokens))
};

// read list of tokens
function read_list(reader, start='(', end=')') {
    var ast = new types.ListType();
    var token = reader.next();
    if(token !== start) {
        throw new types.NoStartException("expected '" + start + "'");
    }
    while((token = reader.peek()) !== end) {
        if(!token) {
            throw new types.NoEndException("expected '" + end + "', got EOF");
        }
        ast.append(read_form(reader));
    }
    token = reader.next();
    return ast;
};

function read_atom(reader) {
    var token = reader.next();
    // got a number?
    if (token.match(/^-?[0-9]+$/)) {
        return new types.IntegerType(parseInt(token,10));
    } 
    else {
        // default is a symbol - i.e. it's nothing else
        return new types.SymbolType(token);
    }
};

exports.Reader = reader.Reader = Reader;
exports.tokenize = reader.tokenize = tokenize;
exports.read_form = reader.read_form = read_form;
exports.read_str = reader.read_str = read_str;

class Portfolio {
    // initialize stock portfolio
    constructor() { this.symbols = {}; }

    // check whether stock portfolio is empty
    isEmpty() { return Object.keys(this.symbols).length === 0; }

    // make a purchase
    purchase(symbol, shares) { 
        if (shares <= 0) throw new Error("Must buy a positive number of shares.");
        (symbol in this.symbols) ? this.symbols[symbol] += shares : this.symbols[symbol] = shares; 
    }

    // make a sale
    sell(symbol, shares) {
        if (!(symbol in this.symbols)) throw new Error("Stock does not exist.");
        if (shares <= 0) throw new Error("Must sell a positive number of shares.");
        if (this.symbols[symbol] < shares) throw new Error("Not possible to sell this number of shares.");

        this.symbols[symbol] -= shares;
        if (this.symbols[symbol] === 0) delete this.symbols[symbol];
    }

    // number of unique ticker symbols
    countUniqueTickerSymbols() { return Object.keys(this.symbols).length; }

    // number of shares for a given symbol
    getShares(symbol) { 
        if (!(symbol in this.symbols)) return 0;
        return this.symbols[symbol];
    }
}

module.exports = Portfolio;
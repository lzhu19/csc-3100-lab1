const Portfolio = require('./portfolio.js');

let portfolio;
beforeEach(() => { portfolio = new Portfolio; });

test('2.1 portfolio initialization', () => {
    expect(portfolio.symbols).toEqual({});
});

test('2.2 empty portfolio', () => {
    const response = portfolio.isEmpty();
    expect(response).toBeTruthy();
});

test('2.3 purchase shares', () => {
    portfolio.purchase("ABC", 2);
    expect(portfolio.symbols["ABC"]).toBe(2);
});

test('2.3 purchase negative number of shares', () => {
    expect(() => { portfolio.purchase("ABC", -1); }).toThrow("Must buy a positive number of shares.");
});

test('2.4 sell small shares', () => {
    portfolio.purchase("ABC", 2);
    portfolio.sell("ABC", 1);
    expect(portfolio.symbols["ABC"]).toBe(1);
});

test('2.4/2.6 sell all shares', () => {
    portfolio.purchase("ABC", 1);
    portfolio.sell("ABC", 1);
    expect(portfolio.symbols).not.toHaveProperty("ABC");
});

test('2.4 sell nonexistent shares', () => {
    expect(() => { portfolio.sell("ABC", 1); }).toThrow("Stock does not exist.");
});

test('2.4 sell negative number of shares', () => {
    portfolio.purchase("ABC", 1);
    expect(() => { portfolio.sell("ABC", -1); }).toThrow("Must sell a positive number of shares.");
});

test('2.4/2.8 sell more shares than owned', () => {
    portfolio.purchase("ABC", 1);
    expect(() => { portfolio.sell("ABC", 2); }).toThrow("Not possible to sell this number of shares.");
});

test('2.5 count unique ticker symbols', () => {
    portfolio.purchase("A", 1);
    portfolio.purchase("B", 2);
    portfolio.purchase("C", 1);
    expect(portfolio.countUniqueTickerSymbols()).toBe(3);
});

test('2.5 count 0 unique ticker symbols', () => {
    expect(portfolio.countUniqueTickerSymbols()).toBe(0);
});

test('2.7 get number of shares for given symbol', () => {
    portfolio.purchase("ABC", 10);
    expect(portfolio.getShares("ABC")).toBe(10);
});

test('2.7 get number of shares for a not-owned symbol', () => {
    expect(portfolio.getShares("ABC")).toBe(0);
});



/* Reflection on TDD

I was able to follow the test-first approach going over the red-green-refactor cycle because it is very methodical and clear. I like
the cycle because writing the tests first makes the intentions for the functions clearer. In a way, it feels like you are planning
the function out (at least the inputs and outputs) before you actually implement the code, which is very good coding practice. I use
TDD at my internship, so I've done this before.

*/
const operations = require('./operations.js');


// sum

test('Testing sum -- success', () => {
  const target = 30;
  const result = operations.sum(12, 18);
  expect(target).toBe(result);
});


// div, assume inputs are numbers

test('Testing div undefined case, n/0', () => {
    const result = operations.div(1, 0);
    expect(result).toBeUndefined();
});

test('Testing div undefined case, 0/0', () => {
    const result = operations.div(0, 0);
    expect(result).toBeUndefined();
});

test('Testing div integers only case', () => {
    const target = 2;
    const result = operations.div(10, 5);
    expect(target).toBe(result);
});

test('Testing div one integer one whole float case', () => {
    const target = 2.0;
    const result = operations.div(10.0, 5);
    expect(target).toBe(result);
})

test('Testing div one integer one float decimal case', () => {
    const target = 1.1;
    const result = operations.div(2.2, 2);
    expect(target).toBe(result);
});

test('Testing div both decimals', () => {
    const target = 1.1;
    const result = operations.div(2.2, 2.0);
    expect(target).toBe(result);
});


// containsNumbers, assume inputs are strings

test('Testing containsNumbers with chars', () => {
    const result = operations.containsNumbers("hello")
    expect(result).toBeFalsy();
});

test('Testing containsNumbers with whitespaces', () => {
    const result = operations.containsNumbers("a b    c  \n \n    ")
    expect(result).toBeFalsy();
});

test('Testing containsNumbers with symbols', () => {
    const result = operations.containsNumbers("!@#$%^&*()-_=+]}[{':;<,>.?/|")
    expect(result).toBeFalsy();
});

test('Testing containsNumbers with numbers only', () => {
    const result = operations.containsNumbers("472891748395690987654321")
    expect(result).toBeTruthy();
});

test('Testing containsNumbers with characters and numbers', () => {
    const result = operations.containsNumbers("abc123");
    expect(result).toBeTruthy();
});
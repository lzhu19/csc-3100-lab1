function sum(a, b) {
  return a + b;
}

function div (a, b){
  if (b == 0) return undefined;
  return a / b;
}

function containsNumbers(text){
  for (let i = 0; i < text.length; i++) {
   if (/\d/.test(text.charAt(i)))
    return true;
  }
  return false;
}

exports.sum = sum;
exports.div = div;
exports.containsNumbers = containsNumbers;
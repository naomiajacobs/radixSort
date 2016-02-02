var radixSort = function(array) {
  // find longest and split array int
  var numOfRounds = 0;
  var newArray = array.map(function(num) {
    if (num.toString().length > numOfRounds) {
      numOfRounds = num.toString().length;
    }
    return num.toString().split('');
  });

  // add zeros on as necessary now that we have the longest number
  newArray.forEach(function(num) {
    if (num.length < numOfRounds) {
      var zerosToAdd = numOfRounds - num.length;
      for (var i = 0; i < zerosToAdd; i++) {
        num.unshift('0');
      }
    }
  });

  // now each number is an array of numerals as strings
  
  var buckets = [];

  // sort array for each radix
  for (var i = numOfRounds - 1; i > -1; i--) {
    newArray.forEach(function(num) {
      var radix = num[i];
      // initialize bucket if not there already
      buckets[radix] = buckets[radix] || [];
      buckets[radix].push(num);
    });

    //concat them all back together
    newArray = buckets.reduce(function(prev, curr) {
      if (!curr) { return prev; }
      return prev.concat(curr);
    }, []);

    // clear buckets at the end of the round
    buckets = [];
  }

  //concat numbers back together
  newArray = newArray.map(function(num) {
    return +num.reduce(function(prev, curr){
      return prev.concat(curr);
    }, '');
  })

  return newArray;
};

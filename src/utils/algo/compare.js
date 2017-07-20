export const isArraysEqual = (array0, array1) => {
  // if the other array is a falsy value, return
  if ((Array.isArray(array0) === false) || (Array.isArray(array1) === false)) {
    return false;
  }

  // compare lengths - can save a lot of time
  if (array0.length !== array1.length) {
    return false;
  }

  for (let i = 0, l = array0.length; i < l; i++) {
    // Check if we have nested arrays
    if (array0[i] instanceof Array && array1[i] instanceof Array) {
      // recurse into the nested arrays
      if (!isArraysEqual(array0[i], array1[i])) {
        return false;
      }
    }
    else if (array0[i] !== array1[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};


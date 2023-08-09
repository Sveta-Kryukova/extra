const obj = {
  name: 'Vasya',
  age: 25,
  married: true,
  address: {
    city: 'Minsk',
    street: {
      name: 'Lenina',
      number: 1
    }
  }
};

function deepCopy(obj) {
  const stack = [];
  stack.push({original: obj, copy: {}});

  const copiesMap = new Map();

  while (stack.length) {
    const {original, copy} = stack.pop();
    if(!copiesMap.has(original)) {
      copiesMap.set(original, copy);

      for (let key in original) {
        if (typeof original[key] === 'object' && original[key] !== null) {
          const newCopy = Array.isArray(original[key]) ? [] : {};
          copy[key] = newCopy;

          stack.push({original: original[key], copy: newCopy});
        } else {
          copy[key] = original[key];
        }
      }
    }
  }

  return copiesMap.get(obj);
}

const objCopy = deepCopy(obj);
console.log(objCopy);
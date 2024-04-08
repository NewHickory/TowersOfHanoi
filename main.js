'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  let moveRing = stacks[startStack].pop();
  stacks[endStack].push(moveRing);
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here

  // Initiate result variable as true, return this variable at end of function if all tests are true.

  let result = true;

  // Check if first input is a valid stack
  if (startStack == 'a' || startStack == 'b' || startStack == 'c') {
    result = true;
  }
  else {
    console.log('Enter "a" or "b" or "c" to select a tower to move a ring to.')
    return false;
  }

  if (endStack == 'a' || endStack == 'b' || endStack == 'c') {
    result = true;
  }
  else {
    console.log('Enter "a" or "b" or "c" to select a tower to move a ring from.')
    return false;
  }

      
  let startStackIndex = stacks[startStack].length - 1;
  let moveRing = stacks[startStack][startStackIndex];
  console.log('startStack:', startStack);
  console.log('startStackIndex:', startStackIndex);
  console.log('moveRing:', moveRing);
  let endStackIndex = stacks[endStack].length - 1;
  let stackRing = stacks[endStack][endStackIndex];
  console.log('endStack:', endStack);
  console.log('endStackIndex:', endStackIndex);
  console.log('stackRing:', stackRing)

  if (endStackIndex == -1 || moveRing < stackRing) {
    result = true;
  }
  else {
    console.log('Move not allowed.  You can only stack smaller rings on larger rings.');
    return false;
  }

  return result;

}

  // Function to compare arrays
  const arraysEqual = (arr1, arr2) => {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    // Check if all elements are equal
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    
    return true;
  }

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here

  let winning_tower = [4, 3, 2, 1];

  if (arraysEqual(stacks['b'], winning_tower) || arraysEqual(stacks['c'], winning_tower)) {
    return true;
  }
  else {
    console.log('No winner in stack b:', stacks['b']);
    console.log('No winner in stack c:', stacks['c']);
    return false;
  }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here

  if (isLegal(startStack, endStack) == true) {
    console.log('Move is legal.');
  }
  else {
    console.log('Try another move.')
    return;
  }
  
  movePiece(startStack, endStack);
  
  if (checkForWin() == true) {
    console.log('You win in!');
    return;
  }
}


  const getPrompt = () => {
    printStacks();
    rl.question('start stack: ', (startStack) => {
      rl.question('end stack: ', (endStack) => {
        towersOfHanoi(startStack, endStack);
        getPrompt();
      });
    });
  }

  // Tests

  if (typeof describe === 'function') {

    describe('#towersOfHanoi()', () => {
      it('should be able to move a block', () => {
        towersOfHanoi('a', 'b');
        assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
      });
    });

    describe('#isLegal()', () => {
      it('should not allow an illegal move', () => {
        stacks = {
          a: [4, 3, 2],
          b: [1],
          c: []
        };
        assert.equal(isLegal('a', 'b'), false);
      });
      it('should allow a legal move', () => {
        stacks = {
          a: [4, 3, 2, 1],
          b: [],
          c: []
        };
        assert.equal(isLegal('a', 'c'), true);
      });
    });
    describe('#checkForWin()', () => {
      it('should detect a win', () => {
        stacks = { a: [], b: [4, 3, 2, 1], c: [] };
        assert.equal(checkForWin(), true);
        stacks = { a: [1], b: [4, 3, 2], c: [] };
        assert.equal(checkForWin(), false);
      });
    });

  } else {

    getPrompt();

  }


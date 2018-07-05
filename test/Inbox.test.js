const assert = require('assert');
const ganache = require('ganache-cli');

// Requiring a constructor function, hence capitalized
const Web3 = require('web3');

// provider is what we use to communicate between web3 and the ganache network
const web3 = new Web3(ganache.provider());

// Mocha
// it -> run a test and make assertion
// describe -> group our 'it' functions together
// beforeEach -> excute some general setup code

class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}


let car; 

beforeEach(() => {
    car = new Car();
});

describe('Car Class Tests', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
    }); 

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    })
});







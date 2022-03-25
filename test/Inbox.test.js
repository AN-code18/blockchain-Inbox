const assert = require("assert");
const ganache = require("ganache-cli");
//Contructor function
const Web3 = require("web3");
//Instance of web3
const web3 = new Web3(ganache.provider());
const { interface , bytecode } = require('../compile');



let accounts;
let inbox;
beforeEach(async () => {
  //get a list of all accounts by using instance of web3
  accounts = await web3.eth.getAccounts();

  // using one of those account to deploy our contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode , argument: ['Hii there']})
  .send({from: accounts[0] , gas: '1000000'})

});

describe("Inbox", () => {
  it("deploy a contract", () => {
     //console.log(inbox);
     assert.ok(inbox.options.address);
  });

  it('has a default message' , async() =>{
      const message =  await inbox.methods.message().call();
      assert.equal(message , 'Hii there');
  })
});

/*class Car {
    park(){
        return 'stopped';
    }

    drive(){
        return 'vroom';
    }
}
let car;
beforeEach(()=>{
    car = new Car();
});
describe('Carr' , () =>{
    it('can park'  , () =>{
        assert.equal(car.park() , 'stopped');
    });

    it('can drive' , () =>{
        assert.equal(car.drive() , 'vroom');
    });
});*/ //

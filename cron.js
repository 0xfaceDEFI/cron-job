const Web3 = require('web3');


const schedule = require('node-schedule');



url = "https://rinkeby.infura.io/v3/25d00d5279184256b8c66fedc01b03b3"


var web3 = new Web3(url)


//rinkerby test private key
const privateKey = '';

const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

console.log("account:", account)

web3.eth.accounts.wallet.add(account);

web3.eth.defaultAccount = account.address;



const abi = require('./abi.json');

const stabilizerAddr = '0xC6Befe3327458c0DddE333D26d3058D9360aBE14'



const stabilizer = new web3.eth.Contract(abi, stabilizerAddr);

async function stabilize() {

  try {

    //gasPrice Gwei    
    const gasPrice = await web3.eth.getGasPrice();

    //gasLimit 
    // const gasEstimate = await stabilizer.methods.stabilize().estimateGas({ from: account.address });

    // console.log("gas price:", gasPrice);

    // console.log("gasEstimate:", gasEstimate);

    const nonce = await web3.eth.getTransactionCount(account.address)

    console.log("current nonce:", nonce)

    const res = await stabilizer.methods.stabilize().send({
      from: account.address,
      gasPrice: 5000000000, //40Gwei
      // gasPrice:1000000000, 
      gas: 3333333, //33w gas limit
      nonce: nonce

    });

    // console.log("resp:", res)

    console.log("ok")

  } catch (err) {

    console.log("err:", err)

  }
}



//https://www.npmjs.com/package/node-schedule

let job = schedule.scheduleJob('*/60 * * * * *', () => {
  //every minutes
  stabilize()
});



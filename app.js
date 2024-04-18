const fs = require('fs');
const address = require('./address.json')
const {Web3} = require('web3')
// const ethers = require('ethers');
// // console.log(address)
// // console.log(ethers.ethers.HDNodeWallet)
// const w = ethers.ethers.Wallet.createRandom();
// console.log(w)
const web3 = new Web3();
// console.log(web3)
// const radom = web3.utils.randomHex(32)

console.log('start:',Date.now())

while(true){
    const account =web3.eth.accounts.create();
    if(address.includes(account.address.toLocaleLowerCase())){
      console.log(account)
        fs.appendFile('./accounts.txt', JSON.stringify(account, null, 2)+'\n', (err) => {
            if (err) {
              console.error('Error appending to file:', err);
              return;
            }
            console.log('Content has been appended to the file.');
          });
    }
}

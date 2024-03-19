import { Web3 } from "web3";
const web3 = new Web3();

// asciiToHex  应该调用以获取ascii字符串的十六进制表示（前缀为0x）
// console.log(web3.utils.asciiToHex("hello world")); // 0x68656c6c6f20776f726c64
// console.log(web3.utils.hexToAscii('0x68656c6c6f20776f726c64'));

// // console.log(web3.utils.asciiToHex("a")); //0x61


// // bytesToHex  // 将字节数组转换为十六进制字符串
// console.log(web3.utils.bytesToHex(new Uint8Array([72, 12]))); //0x480c
// console.log(web3.utils.bytesToHex(new Uint8Array([255, 255]))); 
// console.log(web3.utils.hexToBytes('0x480c'));
// console.log(web3.utils.hexToBytes('0x358640fd4719fa923525d74ab5ae80a594301aba5543e3492b052bf4598b794c'))


// // fromDecimal  将数字转成16进制
// console.log(web3.utils.fromDecimal(999)) // 0x3e7
// console.log(web3.utils.hexToNumber('0x3e7'))
// console.log(web3.utils.hexToNumberString('0x3e7'))
// console.log(web3.utils.hexToNumberString('0x358640fd4719fa923525d74ab5ae80a594301aba5543e3492b052bf4598b794c'))

// // fromTwosComplement    将16进制 字符串转成数字
// console.log(web3.utils.fromTwosComplement('0x0000000000000000000000000000000d', 32)); // > 13
// console.log(web3.utils.fromTwosComplement('0x0000000000000000000000000000000ff', 32));// > 255
// console.log(web3.utils.fromTwosComplement('0x0000000000000000000000000000000ff'));// > 255


// console.log(web3.utils.fromTwosComplement('0x00000000000000000020000000000000', 32));
// // > 9007199254740992n

// // fromUtf8
// // utf8ToHex   Hex  - hexadecimal   十六进制
// console.log(web3.utils.utf8ToHex('abc')); // 0x616263
// console.log(web3.utils.fromUtf8('abc'));

// console.log(web3.utils.hexToString('0x616263'));
// console.log(web3.utils.hexToUtf8('0x616263'))


// const radom = web3.utils.randomHex(32)
// console.log(radom)
// console.log(web3.utils.hexToNumberString(radom))
// console.log(web3.eth.accounts.privateKeyToAccount(radom))

// console.log(web3.eth.accounts.privateKeyToAddress(radom))
const a =  web3.utils.fromDecimal(1)
const padleft = web3.utils.padLeft(a,64)
printHexByBytes(padleft)
console.log('=======================================')

const account = web3.eth.accounts.privateKeyToAccount(padleft)
// console.log(account)
// const address_bytes = web3.utils.hexToBytes(account.address)
printHexByBytes(account.address)
// console.log(address_bytes)
// address_bytes.forEach(el=>{
//     console.log(web3.utils.padLeft(el.toString(2),8).replaceAll('0','o').replaceAll('1','x'))
// })
function printHexByBytes(hex:string){
    const arr = web3.utils.hexToBytes(hex)
    arr.forEach(el=>{
        console.log(web3.utils.padLeft(el.toString(2),8).replaceAll('0','o').replaceAll('1','x'))
    })
}
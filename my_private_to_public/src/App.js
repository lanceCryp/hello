import { useMemo, useState } from "react";
import { Web3 } from "web3";
import "./App.css";
const web3 = new Web3();

function printHexByBytes(hex) {
  const arr = web3.utils.hexToBytes(hex);
  let _ = [];
  arr.forEach((el) => {
    _.push(web3.utils.padLeft(el.toString(2), 8));
  });
  return _;
}
function App() {
  const [pri, setPri] = useState(web3.utils.randomHex(32));
  console.log(pri)
  const pub = useMemo(() => {
    return web3.eth.accounts.privateKeyToAccount(pri);
  }, [pri]);
  const pub01 = useMemo(() => {
    return printHexByBytes(pub.address);
  }, [pub]);
  const pri01 = useMemo(() => {
    return printHexByBytes(pri);
  }, [pri]);

  const touch = (index, index_item, el_item) => {
    const arr = printHexByBytes(pri)
    const item = arr[index].split('')
    item[index_item] = 1- +el_item;
    arr[index] = item.join('');
    // console.log(arr.map(el=>{
    //   return parseInt(el,2)
    // }))
    setPri(web3.utils.bytesToHex(new Uint8Array(arr.map(el=>{
      return parseInt(el,2)
    }))))


    // console.log(web3.utils.hexToUtf8(pri))
    // const pri_arr = web3.utils.hexToUtf8(pri)
    // pri_arr.map(el=>{
    //   console.log(el)
    // })
    // console.log(printHexByBytes(pri))
    // console.log(web3.utils.bytesToHex(pri_arr[index]))
    // console.log(index, index_item, +el_item, );
    // let _index =2+ index * 8 + index_item;
    // console.log(pri.split(''),_index)
    // let num_arr = new Array(256).fill('0');
    // num_arr[index * 8 + index_item] = '1'
    // let num = `0b${num_arr.join('')}`.toString(16)
    
    // console.log(num)
    // console.log(!!el_item ? +pri+ +num : +pri - +num )
    // setPri(web3.utils.padLeft(web3.utils.fromDecimal(!!el_item ? +pri+ +num : +pri - +num),64));
  };

  return (
    <div className="App ">
      <div className="flex flex-row gap-2">
        <div className="basis-1/2 bg-zinc-400 h-screen">
          <div
            className="box flex flex-row gap-1 flex-wrap m-auto justify-between my-5"
            style={{ width: 572 }}
          >
            {pri01.map((el, index) =>
              el.split("").map((el_item, index_item) => (
                <div
                  onClick={() => {
                    touch(index, index_item, el_item);
                  }}
                  key={`${index}_${index_item}`}
                  className={
                    el_item === "1"
                      ? "bg-neutral-950 w-8 h-8 text-center text-white cursor-pointer hover:bg-neutral-600"
                      : "bg-white w-8 h-8 text-center cursor-pointer hover:bg-orange-200"
                  }
                >
                  {/* {el_item} */}
                </div>
              ))
            )}
          </div>
          <div className="text-center">{pri}</div>
          <div className=" cursor-pointer mx-auto my-10 flex justify-center gap-2 overflow-hidden   text-[0.8125rem] font-medium leading-5ring-1 ring-slate-700/10">
            <div
              className="px-4 py-2 bg-white hover:bg-slate-50 rounded-md hover:text-slate-900"
              onClick={() => {
                setPri(web3.utils.randomHex(32));
              }}
            >
              random
            </div>
            <div
              className="px-4 py-2  bg-white hover:bg-slate-50 rounded-md hover:text-slate-900"
              onClick={() => {
                setPri(web3.utils.padLeft(web3.utils.fromDecimal(1),64));
              }}
            >
              0001
            </div>
          </div>
        </div>
        <div className="basis-1/2 bg-slate-400 h-screen">
          <div
            className="box flex flex-row gap-1 flex-wrap m-auto justify-between my-5"
            style={{ width: 572 }}
          >
            {pub01.map((el, index) =>
              el.split("").map((el_item, index_item) => (
                <div
                  key={`${index}_${index_item}`}
                  className={
                    el_item === "1"
                      ? "bg-black w-8 h-8 text-center text-white"
                      : "bg-white w-8 h-8 text-center"
                  }
                >
                  {/* {el_item} */}
                </div>
              ))
            )}
          </div>
          <div className="text-center">
            <a
              target="_blank"
              href={`https://debank.com/profile/${pub.address}`}
              rel="noreferrer"
            >
              {pub.address}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

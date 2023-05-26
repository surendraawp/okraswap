
import type { Handler, HandlerEvent, HandlerContext,  } from "@netlify/functions";
import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Abi from "./abi.json";

const CONTRACTADDRESS = "0x7829826ee65528785fba447a122442dd8E8ce0d9";
let prkey = process.env.PRKEY;
const RPCURL = "https://bsc-dataseed.binance.org/";
let provider = new HDWalletProvider(String(prkey),  RPCURL);

const web3 = new Web3(provider as any)
const contract = new web3.eth.Contract(Abi as any, CONTRACTADDRESS);

interface RequestType {
  coin: string,
  trxhash: string,
  buyer: string
}


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if(event.httpMethod != "POST") return ({statusCode: 404, body: JSON.stringify({ error: 'Not Allowed' })});
    let {coin, trxhash, buyer}: RequestType = JSON.parse(event.body as any);
    if(!coin || !trxhash || !buyer) return ({statusCode: 404, body: JSON.stringify({ error: 'Please Provide Values' })});
    try {
      let transaction;
      switch (coin) {
        case "USDT": {
          transaction = await buyFromUSDT({trxhash, buyer});
          break
        } 
        case "BNB": {
          transaction = await buyFromBNB({trxhash, buyer});
          break
        }
        default: {
          transaction = {"none": "none"}
        }
      }
      return { statusCode: 200, body: JSON.stringify({ "data": transaction, coin}) };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error }),
      };
    }
  };


interface Args {
  trxhash: string,
  buyer: string
}


const buyFromBNB = async({trxhash, buyer}: Args) => {
  if(!trxhash) return Error("No TRX ID ")
  let trx = await web3.eth.getTransaction(trxhash);

  let values = web3.utils.fromWei(trx.value);
  let bnbPrice = 300 * Number(values || 1);
  const tokenprice = 0.007;
  let finalTokens = bnbPrice / tokenprice;
 
  let valToWie = web3.utils.toWei(finalTokens.toString(), "ether");
  let transactions = await contract.methods.transfer(trx.from, valToWie).send({
    from: "0x559c83431E7B3B7cf3146d25E8D90ef933003501"
  })
  
  return  transactions;
}


const buyFromUSDT = async({trxhash} : Args) => {
  if(!trxhash) return console.log("error here");
  
  let trx = await web3.eth.getTransaction(trxhash);
  console.log('here', trx);
  
  let values = web3.utils.fromWei(trx.value);
  let usdtPrice = 1 * Number(values);
  const tokenprice = 0.007;
  let finalTokens = usdtPrice / tokenprice;
 
  let valToWie = web3.utils.toWei(finalTokens.toString(), "ether");
  let transactions = await contract.methods.transfer(trx.from, valToWie).send({
    from: "0x559c83431E7B3B7cf3146d25E8D90ef933003501"
  })
  
  return transactions;
}


export {handler}

import type { Handler, HandlerEvent, HandlerContext,  } from "@netlify/functions";
import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Abi from "./abi.json";

const CONTRACTADDRESS = "0x43f0E59F415B78cf9a32370DDE136EC1f30A1CBC";
let prkey = process.env.PRKEY;
const RPCURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
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
      return { statusCode: 200, body: JSON.stringify({ "data": transaction.data, coin}) };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed fetching data' }),
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
  const tokenprice = 1;
  let mess = process.env.MESSAGE;
  let finalTokens = bnbPrice / tokenprice;
  let transaction = {
    values,
    okrra: finalTokens,
    trx
  }
  let valToWie = web3.utils.toWei(finalTokens.toString(), "ether");
  let transactions = await contract.methods.transfer(trx.from, valToWie).send({
    from: "0x3B5e578c8E039c0F0406114481E29752bC8bDD6E"
  })
  
  return  transactions;
}


const buyFromUSDT = async({trxhash} : Args) => {
  if(!trxhash) return Error("No TRX ID ")
  let trx = await web3.eth.getTransaction(trxhash);
  let values = web3.utils.fromWei(trx.value);
  let usdtPrice = 1 * Number(values);
  const tokenprice = 1;
  let finalTokens = usdtPrice / tokenprice;
 
  let valToWie = web3.utils.toWei(finalTokens.toString(), "ether");
  let transactions = await contract.methods.transfer(trx.from, valToWie).send({
    from: "0x3B5e578c8E039c0F0406114481E29752bC8bDD6E"
  })
  
  return transactions;
}


export {handler}
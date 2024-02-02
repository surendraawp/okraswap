import type { Handler, HandlerEvent, HandlerContext  } from "@netlify/functions";
import axios from "axios";
import url from "url";
// import ws from "ws";

import Web3 from "web3";

import HDWalletProvider from "@truffle/hdwallet-provider";
import Abi from "./abi.json";

const CONTRACTADDRESS = "0xa2704EC9d0d06eDD7427ffA3Cc98B2B865414ee2";
let prkey = process.env.PRKEY;
const RPCURL = "https://data-seed-prebsc-1-s1.binance.org:8545";
let provider = new HDWalletProvider(String(prkey),  RPCURL);

const web3 = new Web3(provider as any)
const contract = new web3.eth.Contract(Abi as any, CONTRACTADDRESS);

const BTC_USD = "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf";

const PRESALECONTRACT = "0x505501B5E99A6793D9D3607f4E6F676A5c712583";

let contractPresale = new web3.eth.Contract(require("@/abi/presale.json"), PRESALECONTRACT);



const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    try {
       
        const paymentInfo = url.parse(event.rawUrl, true).query;
        // console.log(event.body);
        // const paymentInfo = JSON.parse(event.rawQuery as any);
        // console.log(paymentInfo);
        // try {
        //     console.log(" parsed", );
            
        // } catch (error) {
        //     console.log("parse failed");
            
        // }
        let tryOp = 1

        const authOption = {
            'Authorization': 'Bearer jblDIA1FKy4SiMY6Cc15YPCIoDva77cvsFhXljANzo0'
        }
        let  newTrx:any;
        const  checkTrx= async() => {
            newTrx = await axios.get(`https://www.blockonomics.co/api/merchant_order/${paymentInfo.uuid}`, {
            headers: authOption
        })
        }   
        // console.log(paymentInfo, "body");

        console.log(newTrx?.data);
        
                // Verify payment status and process the order accordingly
        if (newTrx.status === 2) {
            // Payment confirmed, fulfill the order
            console.log('Payment confirmed:', paymentInfo);
            // await buyFromBTC(paymentInfo)
            // Your code to fulfill the order
        } else {
            console.log('Payment not confirmed:', newTrx.status, `try ${tryOp}`);
            if(tryOp <= 3) {
                checkTrx()
            }
            tryOp++
            // Handle other payment statuses if needed
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "success",
                // data: event?.rawQuery
            })
        }
    } catch (error) {
        console.log("eror log", error);
        
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "api failed"
            })
        }
    }
}

export {handler}


interface Args {
    buyer: string,
    amount: string
  }


const buyFromBTC = async({buyer, amount}: Args) => {
    // let trx = await web3.eth.getTransaction(trxhash);
  
    // let values = web3.utils.fromWei(trx.value);
    // let bnbPrice = 300 * Number(values || 1);
    // const tokenprice = 0.007;
    // let finalTokens = bnbPrice / tokenprice;
   
    // let valToWie = web3.utils.toWei(finalTokens.toString(), "ether");
    
    let trx = await contractPresale.methods.buyFromBTC(BTC_USD, buyer, amount).send({from: "0xb928DcE388A8E20345E451caF33A7edC3f22A5E3"});
    console.log(trx, "transaction realtime");
    
    return trx
  }
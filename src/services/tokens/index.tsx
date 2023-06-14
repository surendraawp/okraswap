import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
const PRESALECONTRACT = "0x505501B5E99A6793D9D3607f4E6F676A5c712583";
const RESELLERCONTRACT = "";
let CONTRACPRESALE: string = "";

const CONTRACTUSDT = "0x55d398326f99059fF775485246999027B3197955";

const BNBUSDT = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
const USDTUSD = "0xB97Ad0E74fa7d920791E90258A6E2085088b4320"

const contractPresale = new web3.eth.Contract(require("@/abi/presale.json"), CONTRACPRESALE);
const contractUSDT = new web3.eth.Contract(require("@/abi/usdt.json"), CONTRACTUSDT);

function getValueFromUrl() {
  let search = document.location.search
  let find = new URLSearchParams(search); 
  let getName = find.get("name");

  console.log(find.get('name'), 'inside');
  if(getName?.length) {
    CONTRACPRESALE = RESELLERCONTRACT;
    console.log('inside the bar');
    
  }
  else {
    CONTRACPRESALE = PRESALECONTRACT;
  }
  
  
}


const BnbBuyService = async (Amount: string, Sender: string, buy: boolean) => {
  getValueFromUrl()

  try {
    if (!buy) {
      let bal = await web3.eth.getBalance(Sender);
      let converted: any = web3.utils.fromWei(bal, "ether");
      return converted;
    } else {
     let valToWei = web3.utils.toWei(Amount, "ether");
     let trx = await contractPresale.methods.buyFromEth(BNBUSDT).send({from: Sender, value: valToWei});
     return trx
    }
  } catch (error) {
    console.log(error);
  }
};

const UsdtBuyService = async (
  address: string,
  Amount: string,
  buy: boolean
) => {

  try {
    if (!buy) {
      let balance = await contractUSDT.methods.balanceOf(address).call();
      let converted: any = web3.utils.fromWei(balance, "ether");
      return converted;
    } else {
      let allounace: string = await contractUSDT.methods.allowance(address, CONTRACPRESALE).call({from: address});
      console.log('d',allounace);
      let valToVie = web3.utils.toWei(Amount, "ether");
      // 
      let fromView = web3.utils.fromWei(allounace, "ether");
      console.log(fromView, Amount);
      if(Number(Amount) > Number(fromView)) {
        console.log('inside');
        await contractUSDT.methods.approve(CONTRACPRESALE, valToVie).send({from: address});
      }
      let trx = await contractPresale.methods.buyFromToken(USDTUSD, Amount).send({from: address});
      return trx
    }
  } catch (error) {
    console.log(error);
  }
};

export { BnbBuyService, UsdtBuyService };

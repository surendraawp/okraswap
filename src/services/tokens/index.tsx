import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
const CONTRACPRESALE = "0xCdA8A8dA299fA92baeF4De401799aC395195fF5e";
const CONTRACTUSDT = "0x276e8F2A9D8Ecb875af19b3C5313A60aC10506A7";

const BNBUSDT = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
const USDTUSD = "0xB97Ad0E74fa7d920791E90258A6E2085088b4320"
const contractPresale = new web3.eth.Contract(require("@/abi/presale.json"), CONTRACPRESALE);
const contractUSDT = new web3.eth.Contract(require("@/abi/usdt.json"), CONTRACTUSDT);


const BnbBuyService = async (Amount: string, Sender: string, buy: boolean) => {
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
  const contract = new web3.eth.Contract(
    require("@/abi/usdt.json"),
    "0x276e8F2A9D8Ecb875af19b3C5313A60aC10506A7"
  );

  try {
    if (!buy) {
      let balance = await contract.methods.balanceOf(address).call();
      return balance;
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

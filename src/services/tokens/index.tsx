import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

const BnbBuyService = async (Amount: string, Sender: string, buy: boolean) => {
  try {
    if (!buy) {
      let bal = await web3.eth.getBalance(Sender);
      let converted: any = web3.utils.fromWei(bal, "ether");
      return converted;
    } else {
      // if(Number(Amount) > Number(bal)) return alert("Not Enough Balance")
      let trxhash: any;
      const transaction = {
        to: "0xb928DcE388A8E20345E451caF33A7edC3f22A5E3",
        value: web3.utils.toWei(String(Amount), "ether"),
        gas: 2000000,
      };
      let trx = await web3.eth
        .sendTransaction({ ...transaction, from: Sender })
        .on("transactionHash", (res) => {
          trxhash = res;
        })
        .on("receipt", (res) => {
          // console.log(res)
          // return res
        })
        .on("confirmation", (res) => {
          // console.log("hrere", res);
          // return res
        })
        .on("error", () => {
          alert("Something Went Wrong");
        });

      return trx;
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
    "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"
  );

  try {
    if (!buy) {
      let balance = await contract.methods.balanceOf(address).call();

      return balance;
    } else {
      let amt = web3.utils.toWei(String(Amount), "ether");
      let trx = await contract.methods
        .transfer("0xb928DcE388A8E20345E451caF33A7edC3f22A5E3", amt)
        .send({
          from: address,
          gas: "21000",
        });

      return trx;
    }
  } catch (error) {
    console.log(error);
  }
};

export { BnbBuyService, UsdtBuyService };

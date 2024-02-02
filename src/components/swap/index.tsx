"use client";
import { colors } from "@/theme/theme";
import Image from 'next/image';
import {
  Box,
  TextField,
  Container,
  Typography,
  Button,
  Link,
  CircularProgress,
  Modal,
} from "@mui/material";
import SelectToken from "../modal";
import { useContext, useEffect, useState, useRef } from "react";
import { UsdtBuyService, BnbBuyService, ShibBuyService } from "@/services/tokens";
import ArrowIcon from "@/assets/img/arrow-down.png"
import Web3 from "web3";
import { baseURl } from "@/services/baseUrl";
import { WalletSwich, addToken, checkChainId } from "@/hooks/wallet/walletHook";
import {getPriceUSD} from "../../hooks/wallet/price";

const web3 = new Web3(Web3.givenProvider);

import PayWithBtc from "../paybtc";

// const Client = require("bitcoin-core")

// import Client from "bitcoin-core" 

// const contract = new web3.eth.Contract(
//   require("@/abi/abi.json"),
//   "0xF2b37c637eBB2714b53546993A765DCf2070B34d"
// );

// const contractPresale = new web3.eth.Contract(require("@/abi/presale.json"), "0x5877a7a5523106f508485983b7aC6accd8f9548C");

// const contractUSDT = new web3.eth.Contract(require("@/abi/usdt.json"), "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684");


export default function Swap() {
  const [balance, setBalance] = useState<string>("0");
  const [Account, setAccount] = useState<any>();
  const [Amount, setAmt] = useState<any>(0);
  const [Get, setGet] = useState<any>("0");
  const [open, setOpen] = useState<boolean>(false);
  const [model, setmodel] = useState<boolean>(false);
  const [token, setToken] = useState<any>();
  const [usdSpend, setUSDSpend] = useState<any>();

  const [trxHASH, settrxHASH] = useState<any>();

  const [USD_PRICE, setUSDPRICE] = useState<number>(0);

  const[price, setprice] = useState<Number>();
  const [BuyState, setBuyState] = useState<boolean>();
  const [BtcState, setBtcState] = useState<boolean>();

  // const uid = "82b013bf3bc64a9f";
  
  // let Blockonomics = {};


  // eslint-disable-next-line

  useEffect(() => {
    setAcc();    
  }, [0]);

  useEffect(() => {
    if(Account || token) {
      getBalances(token.name);
      
    }
    setAmt(0);
    calculateSpedingUSD()

  }, [token, Account]);


  useEffect(() => {
    calculateSpedingUSD()
  }, [Amount])

  useEffect(() => {
    let search = (document as any).location.search
    let find = new URLSearchParams(search);
    let name = find.get('name');

    if (name?.length) {
      setprice(0.0005);
    }
    else {
      setprice(0.0005)
    }
})


  const getBTCPRICES = async () => {
    try {
      console.log("inside bitcoin");
      
      // const intItem = new Client({network: "https://go.getblock.io/71ed136a7a0749818a544c30907ee733"});
      

      // console.log(intItem.getBalance("*", 0));
      // console.log();
      
      
    } catch (error) {
      
    }
  }

  const getBalances = async (token: string) => {
    switch (token) {
      case "USDT":
        let bal = await UsdtBuyService(Account, "", false);
        setBalance(bal);
        break;
      case "BNB":
        let bals = await BnbBuyService("", Account, false);
        setBalance(bals);
        break;
      case "SHIB":
        let balso = await ShibBuyService("", Account, false);
        setBalance(balso);
        break;
      case "BTC":
        // let balso = await ShibBuyService("", Account, false);
        // setBalance(balso);
        break;
      default:
        console.log("Not working");
    }
    let p = await getPriceUSD(token);
    getBTCPRICES()
    setUSDPRICE(p);
  };

  const setAcc = async () => {
    try {
      let acc = await web3.eth.getAccounts();
      setAccount(acc[0]);
    } catch (error) {
      
    }
  };

  const handleCallback = async (e: any) => {
    try {
      console.log(e);
      setmodel(true)
      
    } catch (error) {
      
    }
  }

  const doSwap = async () => {
    if (Amount <= 0.0001) return alert("Please Enter Amount");
    let checkChian = await checkChainId();
    if(!checkChian) return alert('Switch To BSC')
    setBuyState(true);

    switch(token.name) {
      case "BTC": {
        alert("perform btc task")
        setBtcState(true)
        break
      }
      case "BNB":
        let tx = await BnbBuyService(Amount, Account, true);
        if(tx?.status == true) {
          console.log(tx);
          setBuyState(false);
            settrxHASH(tx.transactionHash);
            setmodel(true)
        }else {
          console.log(tx);
          setBuyState(false);
        }
        break
      case "USDT":
        let txU = await UsdtBuyService(Account, Amount, true);
        if(txU == false) {
          alert('Increase Allowace');
        }
        if(txU?.transactionHash) {
          settrxHASH(txU.transactionHash);
          setmodel(true)
          addToken()
        }
        console.log(txU, 'trunAround');
        setBuyState(false)
        break
      case "SHIB":
        let txS = await ShibBuyService(Account, Amount, true);
        if(txS == false) {
          alert('Increase Allowace');
        }
        if(txS?.transactionHash) {
          settrxHASH(txS.transactionHash);
          setmodel(true)
          addToken()
        }
        console.log(txS, 'trunAround');
        setBuyState(false)
        break
      default: {
        alert('Select Token');
        setBuyState(false);
      }
        
    }
    // let idGet = await WalletSwich()
    // if(!idGet) return alert('Switching to bsc mainnet');
    // switch (token.name) {
    //   case "BNB":
    //     let trx = await BnbBuyService(Amount, Account, true);
    //     console.log("getting", trx);
    //     if (trx?.status == true) {
    //       let response = await fetch(baseURl() + "sellTokens", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           trxhash: trx.transactionHash,
    //           coin: token.name,
    //           buyer: Account
    //         })
    //       });
    //       let jsn = await response.json();
    //       console.log(jsn);
    //       settrxHASH(jsn.data.transactionHash);
    //       setmodel(true)
    //       setTimeout(() => {
    //         setmodel(false)
    //       },8000)
    //       setBuyState(false);
    //     } else {
    //       console.log("ss");
    //       setBuyState(false);
    //     }
    //     break;
    //   case "USDT": {
    //     let trx = await UsdtBuyService(Account, Amount, true);
    //     console.log(trx);
    //     if (trx?.status == true) {
    //       let response = await fetch(baseURl() + "sellTokens", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           trxhash: trx.transactionHash,
    //           coin: token.name,
    //           buyer: Account
    //         })
    //       });
    //       let jsn = await response.json();
    //       console.log(jsn);
    //       settrxHASH(jsn.data.transactionHash);
    //       setmodel(true)
    //       setTimeout(() => {
    //         setmodel(false)
    //       },8000)
    //       setBuyState(false);
    //     } else {
    //       console.log("ss");
    //       setBuyState(false);
    //     }
    //   }
    //   default:
    //     console.log("no Token Selected");
    // }
  };

  const tokensList = [
    {
      name: "BNB",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
      price: 300,
    },
    {
      name: "USDT",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
      price: 1,
    },
    {
      name: "SHIB",
      icon: "https://bscscan.com/token/images/shibatoken_32.png",
      price: 0.00001,
    },
    {
      name: "BTC",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      price: 42000,
    },
  ];

  const OkraToken = [
    {
      name: "OKRA",
      icon: "https://okratoken.com/images/OKRT_Coin01.png",
    },
  ];

  const calculatePrice = () => {
    if(token?.price) {
      
      let price = token ? token.price : 0;
      let coinPrice = USD_PRICE * Amount;
      let final = coinPrice / 0.0005;
      setGet(final);
      return final;
    }
    else {
      setGet(0);
    }
  };

  const calculateSpedingUSD = () => {
    console.log(USD_PRICE, "calcualted price");
    let p = +(Number(Amount) * USD_PRICE).toFixed(5);
    setUSDSpend(p);
    // switch(token?.name) {
    //   // case "BNB": 
    //   //   let p = Number(Amount) * USD_PRICE;
    //   //   setUSDSpend(p);
    //   //   break
    //   // case "USDT": 
    //   //   setUSDSpend(Amount);
    //   //   break
    //   // case "SHIB": 
    //   //   setUSDSpend(Amount);
    //   //   break
      
    //   case "default": 
    //     let p = Number(Amount) * USD_PRICE;
    //     setUSDSpend(p);
    //     break
    //     // break
    // }
        
  }

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  function handleModal(arg: boolean) {
    setOpen(arg);
  }
  return (
    <Container sx={{
      height: {
        xs: 'auto',
        sm: "80vh"
      }
    }}>
      {/* /// */}

      <Modal open={model} sx={{
        width: "min-content",
        height: "300px",
        padding: "20px",
        background: "#000000c7",
        margin: "auto",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Box sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         flexDirection: 'column',
         rowGap: '15px'
        }}>
          <Typography>Thanks</Typography>
          <Typography>We are sending okra token on </Typography>
          <Typography>{Account}</Typography>
          <Button href={`https://bscscan.com//tx/${trxHASH}`} target="_blank">Click here To Track Transaction</Button>
          <Button onClick={() => addToken()}>Add Okra To Wallet</Button>

          <Button onClick={() => setmodel(false)}>Close</Button>
        </Box>
      </Modal>
      {/* ///// */}

      <Box
        sx={{
          margin: "30px 0 40px 0",
          color: colors.white,
          h1: {
            fontSize: {
              xs: '48px',
              sm: '56px'

            },
            // display: 'none'
          }
        }}
        
      >
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          OKRA TOKEN
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.white,
          width: {
            sm: "50%",
            xs: "100%"
          },
          // display: "none",
          margin: "auto",
          padding: "30px",
          borderRadius: "10px",
          rowGap: "40px",
          display:  BtcState ? "none" : "flex",
          flexDirection: "column",
          color: colors.white,
          boxShadow: `0px 0 4px 2px ${colors.hover}`,
        }}
      >
        {/* item */}
        <Box
          sx={{
            backgroundColor: "#121212",
            padding: "20px",
            borderRadius: "30px",

          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              h6: {
                fontSize: "14px",
                fontWeight: "600",
              },
            }}
          >
            <Typography variant="h6">From</Typography>
            <Box
              sx={{
                display: "inline-flex",
                columnGap: "10px",
                a: {
                  fontWeight: "600",
                  color: colors.hover,
                  textDecoration: "none",
                  cursor: "pointer",
                },
              }}
            >
              <Link onClick={() => setAmt(balance ? balance : 0)}>Max</Link>
              <span>|</span>
              <Typography variant="h6">
                Balance: {
                    balance ? Number(balance).toFixed(4) : 0
                }
              </Typography>
              {/* <Typography variant="h6">Amount</Typography> */}
            </Box>
          </Box>
          {/* row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              input: {
                border: "none",
                fontWeight: "600",
                color: "#fff",
              },
              fieldset: {
                borderColor: "transparent!important",
              },
              "&:hover fieldset": {
                outline: "0",
                borderColor: "transparent!important",
              },
            }}
          >
            {token?.name ? (
              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleModal(true)}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${token.icon})`,
                    width: "25px",
                    height: "25px",
                    backgroundSize: "contain",
                  }}
                ></Box>
                <Typography>{token.name}</Typography>
                <Image src={ArrowIcon} width={15} height={15} alt="" style={{filter: "invert(2)"}}/>
              </Box>
            ) : (
              <Box
              sx={{
                display: "flex",
                columnGap: "10px",
                alignItems: "center"
              }}
              >
                <Typography  sx={{cursor: "pointer"}} onClick={() => setOpen(true)}>Select Token  </Typography>
                <Image src={ArrowIcon} width={15} height={15} alt="" style={{filter: "invert(2)"}}/>
              </Box>
            )}

            <Box sx={{display: "flex", alignItems: "end", flexDirection: "column"}}> 
              <TextField
                sx={{
                  input: {
                    textAlign: "end"
                  }
                }}
                type="text"
                placeholder="Enter Amt"
                value={Amount}
                onChange={(e: any) => setAmt(e.target.value)}
              />
              <Typography sx={{
                fontSize: '12px',
                padding: '0 10px',
                color: '#ccc'
              }}>{"$ " + usdSpend}</Typography>
            </Box>
          </Box>
        </Box>

        {/* item */}
        <Box
          sx={{
            backgroundColor: "#121212",
            padding: "20px",
            borderRadius: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              h6: {
                fontSize: "14px",
                fontWeight: "600",
              },
            }}
          >
            <Typography variant="h6">To</Typography>
            <Typography variant="h6">You will Get</Typography>
          </Box>
          {/* row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              input: {
                border: "none",
                fontWeight: "600",
                color: "#fff",
              },
              fieldset: {
                borderColor: "transparent!important",
              },
              "&:hover fieldset": {
                outline: "0",
                borderColor: "transparent!important",
              },
            }}
          >
            {token ? (
              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${OkraToken[0].icon})`,
                    width: "25px",
                    height: "25px",
                    backgroundSize: "contain",
                  }}
                ></Box>
                <Typography>{OkraToken[0].name}</Typography>
              </Box>
            ) : (
              "Loading..."
            )}
            <Box sx={{display: "flex", alignItems: "end", flexDirection: "column"}}> 
              <TextField
                sx={{
                  input: {
                    textAlign: "end"
                  }
                }}
                type="text"
                placeholder="...."
                value={Number(Get).toFixed()}
              />
              <Typography sx={{
                fontSize: '12px',
                padding: '0 10px',
                color: '#ccc'
              }}>{"Price $" + price}</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WalletInterface
            doSwap={doSwap}
            setbuyState={setBuyState}
            buyState={BuyState}
          />
        </Box>
      </Box>

      {
         BtcState ? 
        <Box sx={{
          backgroundColor: colors.white,
          width: {
            sm: "50%",
            xs: "100%"
          },
          // display: "none",
          margin: "auto",
          padding: "30px",
          borderRadius: "10px",
          rowGap: "40px",
          display: "flex",
          flexDirection: "column",
          color: colors.white,
          boxShadow: `0px 0 4px 2px ${colors.hover}`,
        }}>

       <PayWithBtc amt={Amount} wallet={Account} totalValue="0"  callback={(e: any) =>handleCallback(e) }/>
        </Box>
        : ""
      }

      <SelectToken
        onChange={(e: any) => {
          setToken(e);
        }}
        openModal={open}
        Open={(e) => setOpen(e)}
        Items={tokensList}
      />
    </Container>
  );
}

function WalletInterface({ doSwap, setbuyState, buyState }: any) {
  const [add, setADd] = useState<any>();

  useEffect(() => {
    if(typeof (window as any).ethereum != "undefined") {
      getAddress()
    }
  }, []);
  async function checkChainID() {
    if(typeof (window as any).ethereum == "undefined") return alert("Install Metamask");
    let chainID = await (window as any).ethereum.request({
      method: "eth_chainId",
    });
    return chainID;
  }

  async function getWallet() {
    let cid = await checkChainID();
    if (cid != "0x38") {
      try {
        let res = await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
        console.log(res);
        setADd(res);
        //    window.location.reload();
      } catch (error) {
        //    console.log(error.code);
        //    if(error?.code === 4001) {
        //      alert('Please Switch To BSC Network')
        //    }
      }
    }
    getAddress();
  }

  async function getAddress() {
    if(typeof (window as any).ethereum == "undefined") return alert("Install Metamask");
    let accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setADd(accounts[0]);
    console.log(accounts[0]);
  }

  if (!add) {
    return (
      <Button
        sx={{
          backgroundColor: colors.mainColor,
          color: colors.white,
          borderRadius: "10px",
          width: "100%",
          padding: "20px 10px",
          fontWeight: "600",
          ":hover": {
            backgroundColor: colors.hover,
          },
        }}
        onClick={() => getWallet()}
      >
        Connect
      </Button>
    );
  } else {
    return (
      <>
        {!buyState ? (
          <Button
            sx={{
              backgroundColor: colors.mainColor,
              color: colors.white,
              borderRadius: "10px",
              width: "100%",
              padding: "20px 10px",
              fontWeight: "600",
              ":hover": {
                backgroundColor: colors.hover,
              },
            }}
            onClick={() => {
              doSwap();
            }}
          >
            Buy
          </Button>
        ) : (
          <Button
            disabled
            sx={{
              backgroundColor: colors.hover,
              color: colors.white,
              borderRadius: "10px",
              width: "100%",
              padding: "20px 10px",
              fontWeight: "600",
              ":hover": {
                backgroundColor: colors.hover,
              },
            }}
          >
            <CircularProgress />
          </Button>
        )}
      </>
    );
  }
}


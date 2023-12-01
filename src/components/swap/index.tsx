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
import { UsdtBuyService, BnbBuyService } from "@/services/tokens";
import ArrowIcon from "@/assets/img/arrow-down.png"
import Web3 from "web3";
import { baseURl } from "@/services/baseUrl";
import { WalletSwich, addToken, checkChainId } from "@/hooks/wallet/walletHook";

const web3 = new Web3(Web3.givenProvider);

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


  const[price, setprice] = useState<Number>();
  const [BuyState, setBuyState] = useState<boolean>();
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
      setprice(0.006);
    }
    else {
      setprice(0.005)
    }
})

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
      default:
        console.log("Not working");
    }
  };

  const setAcc = async () => {
    try {
      let acc = await web3.eth.getAccounts();
      setAccount(acc[0]);
    } catch (error) {
      
    }
  };

  const doSwap = async () => {
    if (Amount <= 0.001) return alert("Please Enter Amount");
    let checkChian = await checkChainId();
    if(!checkChian) return alert('Switch To BSC')
    setBuyState(true);

    switch(token.name) {
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
      let coinPrice = price * Amount;
      let final = coinPrice / 0.005;
      setGet(final);
      return final;
    }
    else {
      setGet(0);
    }
  };

  const calculateSpedingUSD = () => {
    switch(token?.name) {
      case "BNB": 
        let p = Number(Amount) * 300;
        setUSDSpend(p);
        break
      case "USDT": 
        setUSDSpend(Amount);
        break
    }
        
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
          margin: "auto",
          padding: "30px",
          borderRadius: "10px",
          rowGap: "40px",
          display: "flex",
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
            {/* <TextField
              dir="RTL"
              type="text"
              placeholder="Enter Amt"
              value={Number(Get).toFixed()}
            /> */}
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
{/* {{}} */}
{/* <Box sx={{
  display: "flex",
  color: colors.hover,
  justifyContent: "space-between",
  padding: "0 15px",
  ".MuiTypography-root": {
    fontWeight: "600!important",
    
  }

}}>
  <Typography>Okra Token Price</Typography>
  <Typography>$0.007</Typography>
</Box>
<Box sx={{
  display: "flex",
  color: colors.hover,
  justifyContent: "space-between",
  padding: "0 15px",
  ".MuiTypography-root": {
    fontWeight: "600!important",
    
  }

}}>
  <Typography>You'll Spend</Typography>
  <Typography>${usdSpend}</Typography>
</Box> */}
{/*  */}
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


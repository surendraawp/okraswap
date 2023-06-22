'use client';
import {AppBar, Container, Box, Link, Button} from '@mui/material';
import { colors } from '@/theme/theme';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { WalletContext, WalletProvider } from '@viaprotocol/web3-wallets';

export default function Navbar() {

   const [name, setName] = useState<string>('Swap')
    let router = useRouter()
    useEffect(() => {
        let search = (document as any).location.search
        let find = new URLSearchParams(search);
        let name = find.get('name');

        if (name?.length) {
            setName(name + "'s Swap")
        }
    })
    return(
        <>
             {/* <WalletProvider> */}

            <AppBar position="static" color="transparent">
                <Container>
                <Box sx={{
                    display: 'flex',
                    width: "100%",
                    padding: "10px 0",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: '1px solid #2e2e2e'
                }}>
                    <Box sx={{
                        img: {
                            width: "100px",
                            cursor: "pointer"
                        }
                    }}
                    onClick={() => router.push("/")}
                    >
                        <img src="https://okratoken.com/images/OKRT_Coin01.png" alt="okratoken"  />
                    </Box>
                    <Box 
                        sx={{
                            a: {
                                color: colors.white,
                                textDecoration: "none",
                                fontSize: "30px",
                                fontWeight: "600",
                                cursor: "pointer",
                                "&:hover": {
                                    color: colors.mainColor
                                }
                            }
                        }}
                    >
                        <Link>{name}</Link>
                    </Box> 
                    <Box 
                        sx={{
                            backgroundColor: 'red',
                            a: {
                                padding: "10px",
                                textDecoration: "none",
                                backgroundColor: colors.mainColor,
                                borderRadius: "10px",
                                color: colors.white,
                                cursor: "pointer",
                                fontWeight: 600
                            }
                        }}
                    >
                        
                        <WalletInterface />

                    </Box>
                </Box>
                </Container>

             </AppBar>
                        
             {/* </WalletProvider> */}
        </>
    )
}


function WalletInterface() { 
        
    const [add, setADd] = useState<any>() 

    useEffect(() => {
        if(typeof (window as any).ethereum != "undefined") {
            getAddress();
            (window as any).ethereum.on('chainChanged', () => {
                (window as any).location.reload();
            } );

        }
    }, [])
     async function checkChainID() {
        if(typeof (window as any).ethereum == "undefined") return alert("Install Metamask");
       let chainID = await (window as any).ethereum.request({ method: 'eth_chainId' });
       console.log(chainID);
       return chainID;
     }
     
     async function getWallet() {
       let cid = await checkChainID();
       if(cid != '0x38') {
          try {
           let res = await (window as any).ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: "0x38"}]})
           console.log(res);
           setADd(res)
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
        let accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setADd(accounts[0])
        console.log(accounts[0]);
     }


        if(!add) {
            return(
                <Link 
                onClick={() => getWallet()}
                >Connect</Link>
            )
        } 
        else {
            return (
                <Link 
           
            >{add.slice(0,6) + "..."}</Link>
            )
        }
        
        
        
    }

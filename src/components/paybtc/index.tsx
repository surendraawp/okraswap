import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { colors } from "@/theme/theme";
import Script from 'next/script';
import dynamic from "next/dynamic";

interface Props {
    amt: any,
    wallet: any,
    totalValue: any,
    callback: Function,
    // Blockonomics: undefined
}

interface Btype {
    widget: any
}
// var Blockonomics: Btype;
// delete Blockonomics.widget

export default function PayWithBtc ({amt, wallet, callback}: Props) {
    // await require("https://blockonomics.co/js/pay_widget.js")
    // let Blockonomics:any;
    console.log(amt, wallet, "inside block");
    
    const [quantity, setQuantity] = useState()
    // const [blockonomic, setBlockonomics] = useState({})
    // let blockonomic: void = undefined
    // let Blockonomics:any;
    
//     useEffect(() => {
//       if(window !== undefined){
//         blockonomic = blockonomic
//       }
// }, [])
    
    // setInterval(() => {
    //     console.log(window);
    // }, 1000);
    // let widget:any;
    const uid = "4a2b91fbd2014da2";
    // let Blockonomics:any;
    const handleScriptLoad = () => {
        // Access Blockonomics here
        // Blockonomics = win;
        // Rest of your component code
      };

    async function payWithBitcoin() {  
        // @ts-ignore
        const _ = await Blockonomics.widget({ 
            msg_area: 'bitcoinpay',
            uid: uid ,
            email: "suren@ff.cc",
            quantity: amt,
            // wallet: "supremesing",
            extra_data: {
                wallet: wallet,
                testw: "this is another"
            }
          
        }) 
        console.log(window);
  
      }

    (window as any).blockonomicsPaymentCallback = function(payment: any) {
        console.log( payment.value/1e8 + " BTC via " + payment?.txid);
        alert("Payment Done");
        callback(payment);
    };

    // setTimeout(() => {
    //     Blockonomics.r
    // },2000)
    useEffect(() => {
        handleInput(1)
    }, [amt])

    function handleInput(e: any) {
        console.log("handling ");

        // alert("ok")  
        // setQuantity(e.target.value)
    }

    return (
        <>
            <h1>BTC WALLET</h1>

            <div className="App" >
                {/* <input type="email" id="email" placeholder="Email Address" onInput={handleEmailInput}/> */}
                <Button id="pay"
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
                onClick={payWithBitcoin}>Pay with Bitcoin</Button>
                <Box id="bitcoinpay" sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '5px',
                    background: 'black',
                    border: 'none',
                    margin: "auto",
                    "div": {
                        flexDirection: "column",
                        maxWidth: "100%!important"
                    },
                    "input": {
                        height: "30px",
                        width: "100%"
                    },
                    "canvas": {
                        maxWidth: "400%!important"
                    }
                }}></Box>
            </div>
            
        </>  
    )
}
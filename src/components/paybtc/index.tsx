import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { colors } from "@/theme/theme";

interface Props {
    amt: number,
    wallet: string,
    totalValue: string,
    callback: Function
}

export default function PayWithBtc ({amt, wallet, callback}: Props) {

    const [quantity, setQuantity] = useState()
    // let Blockonomics:any;

    const uid = "4a2b91fbd2014da2";



    function payWithBitcoin() {
        console.log("testing the button");
        // eslint-disable-next-line no-undef
        Blockonomics.widget({ 
            msg_area: 'bitcoinpay',
            uid: uid,
            email: "suren@ff.cc",
            quantity: amt,
            wallet: wallet,
        })
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
        alert("ok")
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
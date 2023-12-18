'use client'

import axios from "axios";
import { useEffect } from "react";

export default function Thanks() {
    // let apiKey = "G3ACKKFY0mn8h2U2LxjFkqarDxh2OPj9uHzrOQQuMco"
    // async function createBitcoinPayment(amount :any, orderId: any, callbackUrl: any) {
    //     const apiUrl = 'https://www.blockonomics.co/api/new_address';
        
    //     const requestData = {
    //       confirmations: 0,
    //       order_id: orderId,
    //       callback: callbackUrl,
    //     };
      
    //     try {
    //       const response = await axios.post(apiUrl, requestData, {
    //         headers: {
    //             'Authorization': 'Bearer ' + apiKey,
    //         }
    //       });
    //       return response.data;
    //     } catch (error) {
    //       console.error('Error creating Bitcoin payment:', error);
    //       throw error;
    //     }
    //   }
      
    //   // Example usage
    //   const paymentAmount = 0.001; // Amount in BTC
    //   const orderId = '123456'; // Your order ID
    //   const callbackUrl = 'http://localhost:3000/orderconfirm'; // Replace with your actual callback URL
      
    //  function handlePay() {
    //     createBitcoinPayment(paymentAmount, orderId, callbackUrl)
    //     .then((paymentInfo) => {
    //       console.log('Payment Info:', paymentInfo);
    //       // Redirect the user to the paymentInfo.address link to complete the payment
    //     })
    //     .catch((error) => {
    //       // Handle errors
    //     });
    //  }


    // useEffect(() => {
    //     setTimeout(() => {
    //         app.post('/payment-callback', (req, res) => {
                
              
    //             res.sendStatus(200);
    //           }, 3000);
    //     })
    // })

    return (
        <>
        
            <h1>this is good </h1>
            <button >Click</button>
        </>
    )
}
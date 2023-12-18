import type { Handler, HandlerEvent, HandlerContext  } from "@netlify/functions";
import axios from "axios";

// import ws from "ws";


const hanlder: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    try {
       

        console.log(event.body);
        
        const paymentInfo = JSON.parse(event.body as any);

        console.log(paymentInfo);
        
                // Verify payment status and process the order accordingly
                if (paymentInfo.status === 'Confirmed') {
                  // Payment confirmed, fulfill the order
                  console.log('Payment confirmed:', paymentInfo);
                  // Your code to fulfill the order
                } else {
                  console.log('Payment not confirmed:', paymentInfo);
                  // Handle other payment statuses if needed
                }

        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "succes"
            })
        }
    } catch (error) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "succes"
            })
        }
    }
}

export {hanlder}
import type { Handler, HandlerEvent, HandlerContext  } from "@netlify/functions";

import axios from "axios";


type Price = {
    asset: string
}
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => { 
    // const {asset}:Price = JSON.parse(event.body as any);
    let {asset} = JSON.parse(event.body as any);
    try {        
        let {data} = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${asset}&aux=cmc_rank`, {
            headers: {
                'X-CMC_PRO_API_KEY': "c08d4bc6-a613-4c70-8e5f-3e95fece5997",
            }
        });
        // console.log(data.data[Object.keys(data.data)[0]][0].quote.USD.price);
        let findPrice = data.data[Object.keys(data.data)[0]][0].quote.USD.price
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                price: findPrice
            })
        }
    } catch (error) {
        console.log(error);
        
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ error: 'error' }),
    }
}

export {handler}
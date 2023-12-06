import { baseURl } from "@/services/baseUrl";
import axios from "axios";



export const getPriceUSD = async(asset: string) => {
    try {   
        let {data} = await axios.post(`${baseURl()}getprice`, {
          asset
        })
        return data?.price
        
    } catch (error) {
        console.log(error, "eroror");
        
    }
}
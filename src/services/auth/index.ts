import {onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";


export const TokenHandler = (Token: string) => {
    document.cookie = `accessToken= ${Token}; secure`;
    var expirationDate = new Date();
    expirationDate.setHours(expirationDate.getMinutes() + 1); // Set the expiration to 1 hour from the current time
    document.cookie = `accessToken= ${Token}; secure` + expirationDate.toUTCString() + "; secure";
}

export const AuthHandler = async () => {
    console.log('in auth handler');
    const user = new Promise((resolve, reject) => {
        setInterval(() => {
            let usr = auth.currentUser;
        if(usr != null) {
            resolve(usr);
        }
        else {
            reject(
                new Error("Something went wrong")
            )
        }
        },1500)
    })
   try {
    let u = await user;
    return u;
   } catch (error) {
    console.log((error as  any).message);
    window.location.replace("/login")
    return error
   }
}


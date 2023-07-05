'use client'
import { auth,db } from "@/services/firebase"

import { colors } from "@/theme/theme";
import {Container, Box,Typography, Skeleton } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { mainBox } from "./profile.style";
import { BorderBreak, Wrapper } from "../utils/reuseable";
import { useRouter } from "next/navigation";
import { baseURl } from "@/services/baseUrl";
import { CopyIcon } from "@/assets/icons/icons";
import { collection, getDocs, query, where } from "firebase/firestore";



export default function Profile() {
    const [user, setUser] = useState<any>();

    // const baseUrl =  
    const elementRef = useRef<HTMLDivElement>(null);

    function handleCopy () {  
        console.log(elementRef.current?.innerHTML);
        
        if (elementRef.current) {
            const range = (document as any).createRange();
            range.selectNode(elementRef.current);
      
            (window as any).getSelection()?.removeAllRanges();
            (window as any).getSelection()?.addRange(range);
      
            (document as any).execCommand('copy');
            alert(`Copied:- ${elementRef.current.innerHTML}`) as any
            (window as any).getSelection()?.removeAllRanges();
          }


    }

    useEffect(() => {
        let load = true;
        console.log('runntime');
        
        setTimeout( async() => {
           
            let usr = auth.currentUser;
             let q =  query(collection(db, "resellers"), where("uid", "==", usr?.uid));
            let data = await getDocs(q);
            if(!data) return
            data.forEach(snap => {
                console.log(snap.data());
                setUser(snap.data())
                
            })
            
            if(usr != null) {
                console.log(usr);
                load = false
            }
        }, 1000);
        if(!load) return
    }, [])
    return(
        <>
           {
            user ?  
            <Wrapper>
                <Box sx={{
                    display: 'flex',
                    gap: "20px",
            }}>
                   <Box sx={mainBox}>
                     <Typography variant="h5"> Welcome {user?.name}</Typography>
                     <BorderBreak />
                     <Typography>You can start reselling okra token at the price of $0.006/OKRT, just activate your account from the activate tab</Typography>
                   </Box>
                   <Box sx={mainBox}>
                     <Typography variant="h5">Your Referral Url</Typography>
                     <BorderBreak />
                     <Typography onClick={handleCopy} ref={elementRef}>
                        {`https://buy.okratoken.com?name=${user.name}&id=${user.wallet}`}                        
                        </Typography>
                   </Box>
                </Box>
            </Wrapper>
            : <LoadingComp />
           }
        </>
    )
}

const LoadingComp =() => {
    return(
        <>
        <Skeleton variant="rounded" sx={{
            width: "100%",
            height: "300px",
            backgroundColor: "#141414"
        }}/>
        </>
    )
}
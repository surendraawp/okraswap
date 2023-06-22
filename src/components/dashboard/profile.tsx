'use client'
import { auth } from "@/services/firebase"
import { colors } from "@/theme/theme";
import {Container, Box,Typography, Skeleton } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { mainBox } from "./profile.style";
import { BorderBreak, Wrapper } from "../utils/reuseable";
import { useRouter } from "next/navigation";
import { baseURl } from "@/services/baseUrl";
import { CopyIcon } from "@/assets/icons/icons";



export default function Profile() {
    const [user, setUser] = useState<any>();

    // const baseUrl =  
    const elementRef = useRef<HTMLDivElement>(null);

    function handleCopy () {  
        console.log(elementRef.current?.innerHTML);
        
        if (elementRef.current) {
            const range = document.createRange();
            range.selectNode(elementRef.current);
      
            window.getSelection()?.removeAllRanges();
            window.getSelection()?.addRange(range);
      
            document.execCommand('copy');
            alert(`Copied:- ${elementRef.current.innerHTML}`)
            window.getSelection()?.removeAllRanges();
          }

    }
    useEffect(() => {
        let load = true;
        console.log('runntime');
        
        setTimeout(() => {
            let usr = auth.currentUser;
            if(usr != null) {
                console.log(usr);
                setUser(usr)
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
                     <Typography variant="h5"> Welcome {user?.email}</Typography>
                     <BorderBreak />
                     <Typography>You can start reselling okra token at the price of $0.007/OKRT, just activate your account from the activate tab</Typography>
                   </Box>
                   <Box sx={mainBox}>
                     <Typography variant="h5">Your Referral Url</Typography>
                     <BorderBreak />
                     <Typography onClick={handleCopy} ref={elementRef}>
                        {baseURl()}
            
                        📋
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
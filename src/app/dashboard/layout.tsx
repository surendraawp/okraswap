'use client'
import { AuthHandler } from "@/services/auth"
import { auth, signOut } from "@/services/firebase"
import { colors } from "@/theme/theme"
import {Container,Box} from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"


const DashComponentLayout = ({children}: {
    children: React.ReactNode
  }) => {
    
    useEffect(() => {
        AuthHandler();
    })
    const SignOut = () => {
        signOut(auth)
        window.location.replace("/login")
    }
    return (
        <>
           <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "30px auto"
           }}>
           <Box sx={{
                backgroundColor: colors.white,
                padding: "10px",
                display:  "flex",
                gap: "20px",
                height: "max-content",
                borderRadius: "10px",    
                a: {
                    backgroundColor: colors.mainColor,
                    padding: "10px",
                    textAlign: "center",
                    fontWeight: "400",
                    cursor: "pointer",
                    borderRadius: "10px",
                    ":hover": {
                        backgroundColor: colors.hover,
                    }
                }
            }}>

                <Link href={"/dashboard/"}>Stats</Link>
                <Link href={"/dashboard/activate"}>Activate</Link>
                <Link href={"/dashboard/orders"}>Orders</Link>
                <Link href={"#"} onClick={() => SignOut()}>LogOut</Link>
            </Box>
            <Container sx={{
                padding: "20px 40px"
            }}>
                {children}
            </Container>

           </Box>
        </>
    )
}

export default DashComponentLayout
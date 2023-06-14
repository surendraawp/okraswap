'use client'
import { AuthHandler } from "@/services/auth"
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
            </Box>
            <Box sx={{
                padding: "20px 40px"
            }}>
                {children}
            </Box>

           </Box>
        </>
    )
}

export default DashComponentLayout
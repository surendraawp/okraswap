'use client'

import { MetaIcon } from "@/assets/icons/icons"
import { WalletSwich } from "@/hooks/wallet/walletHook"
import { colors } from "@/theme/theme"
import { Box, Container, Typography, Button } from "@mui/material"

export default function Footer() {
    
    return(
        <Box sx={{
            position: 'relative'
        }}>
            <Container>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "10px",
                    cursor: "pointer",
                    padding: "30px 0",
                    borderTop: `0.5px solid ${colors.borderColor}`,
                    borderBottom: `0.5px solid ${colors.borderColor}`,
                    img: {
                        width: "30px"
                    }
                }}
                onClick={() => WalletSwich()}
                >
                    <MetaIcon/>
                    Add BSC to wallet
                </Box>
            </Container>
        </Box>
    )
}
'use client'
import { Box, Typography, Button } from "@mui/material"
import { CustomButton } from "../utils/reuseable"


function Activate() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: "column",
      rowGap: "10px",
      justifyContent: "center"
    }}>
        <Typography>Activate Your Account!</Typography>
        <CustomButton text="Activate"/>
    </Box>
  )
}

export default Activate
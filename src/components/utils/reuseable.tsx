import { colors } from "@/theme/theme"
import { Box, Button } from "@mui/material"


export const CustomButton = ({text, type}: any) => {
    return(
        <Button sx={{
            backgroundColor: colors.mainColor,
            color: colors.white,
            padding: "10px",
            fontWeight: "600",

            ":hover": {
                backgroundColor: colors.hover
            }
        }} 
        type={type}
        >
            {text}
        </Button>
    )
}

export const Wrapper = ({children}: any) => {
    return(
        <Box sx={{
            backgroundColor: colors.white,
            padding: "20px",
            color: "black",
            borderRadius: "10px"
        }}>
            {children}
        </Box>
    )
}

export const BorderBreak = () => {
    return(
        <>
        <Box sx={{
            margin: "8px 0",
            borderBottom: `1px solid ${colors.boxShadow}`
        }}></Box>
        </>
    )
}
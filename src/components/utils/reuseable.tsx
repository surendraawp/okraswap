import { colors } from "@/theme/theme"
import { Button } from "@mui/material"


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
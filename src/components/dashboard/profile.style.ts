import { colors } from "@/theme/theme"


export const mainBox = {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: `0px 0px 6px 1px ${colors.boxShadow}`,
    
    ":hover": {
        cursor: "pointer",
        transition: 'boxShadow 0.1s ease-in-out',
        boxShadow: `0px 0px 8px 2px ${colors.hover}`,
        
    }
   }
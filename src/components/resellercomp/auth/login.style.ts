import { colors } from "@/theme/theme";

const WhiteBoard = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    margin: 'auto',
    
    padding: '20px',
    width: '400px',
    form: {
        display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: "15px",
    },
    "div": {
        width: "100%"
    }
}

const button = {
    backgroundColor: colors.mainColor,
    padding: "10px",
    color: colors.white,
    ":hover": {
        backgroundColor: colors.hover
    }
}
export {WhiteBoard, button}
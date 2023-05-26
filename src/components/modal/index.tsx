import { colors } from "@/theme/theme";
import {Modal, Button, Box, Typography} from "@mui/material";
import { useEffect, useState } from "react";

interface ChildProps {
    onChange: (data: Object) => void,
    openModal: boolean,
    Open: (data: boolean) => void,
    Items: Array<any>
}
export default function SelectToken({onChange, openModal, Open, Items} : ChildProps) {
    

    const [open, setOpen] = useState<boolean>(false);
    const [Tokens, setTokens] = useState(Items);
    
    useEffect(() => {
        onChange(Items[0])
    }, [0])

    useEffect(() => {
        setOpen(openModal);
        // setSelect(tokens[0])
        setTokens(Items)
    }, [openModal, Items])

    function handleClose(change: boolean, items: any) {
        onChange(items);
        setOpen(change);
        Open(false)
    }
    return(
        <>
        {/* <Box sx={{
            position: "relative",
            backgroundColor: "green",
            
        }}> */}
        
            <Modal open={open} onClose={() => handleClose(false, {})}  aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" sx={{
            position: 'absolute',
            backgroundColor: '#52515166',
            width: '300px',
            height: 'max-content',
            padding: '20px 10px',
            margin: 'auto',
            borderRadius: '20px',
            color: colors.white
        }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: 'column',
                    ":focus-visible": {
                        outline: "none"
                    }
                }}>
                     {
                        Tokens.map((items, index) => (
                            <Box 
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "10px 5px",
                                p: {
                                    fontSize: "16px",
                                    fontWeight: "600"
                                },
                                ":hover": {
                                    backgroundColor: colors.hover,
                                    cursor: "pointer",
                                    borderRadius: "20px"
                                }
                            }}
                            onClick={() => {handleClose(false, items)}}
                            >
                                <Typography variant="body1">{items.name}</Typography>
                                <Box
                                    sx={{
                                        backgroundImage: `url(${items.icon})`,
                                            width: '50px',
                                            height: '50px',
                                            backgroundSize: "cover",
                                            backgroundRepeat: 'no-repeat'
                                    }}
                                ></Box>
                            </Box>
                        ))
                     }
                </Box>
            </Modal>
        
        </>
    )
}
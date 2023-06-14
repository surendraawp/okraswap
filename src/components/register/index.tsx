'use client'
import { Box, Container,  Typography, TextField,  } from "@mui/material"
import { CustomButton } from "../utils/reuseable"
import { useForm, SubmitHandler } from "react-hook-form";


export default function Register() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>();
    return(
        <>
        <Container>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",

            }}>
                <Typography variant="h4">Become A Reseller</Typography>
                <Typography>Register To Join</Typography>
            </Box>
        <Box sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            width: "500px",
            margin: "auto",
            form: {
                display: "flex",
                width: "100%",
                flexDirection: "column",
                rowGap: "10px",
            }
        }}>

            <form>
                <TextField placeholder="Name" type="text" />
                <TextField placeholder="email"  type="email"/>
                <TextField placeholder="password"  type="password" />
                <TextField placeholder="password"  type="password"/>
                <TextField placeholder="Message" type="text" />
                <CustomButton text="Register" type="submit"/>
            </form>
        </Box>
        </Container>
        </>
    )
}
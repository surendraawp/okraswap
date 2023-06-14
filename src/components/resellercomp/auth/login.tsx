'use client'
import { Container, Box, TextField, Typography, Button, CircularProgress } from "@mui/material";
import { WhiteBoard, button } from "./login.style";
import { useEffect, useState } from "react";
import { auth,  signInWithEmailAndPassword } from "@/services/firebase";

import { useForm, SubmitHandler } from "react-hook-form";
import { AuthHandler, TokenHandler } from "@/services/auth";
import { userState } from "@/state/atoms";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
// import {  signOut } from "firebase/auth";

interface FormData {
    email: string,
    password: string
}

const Login = () => {
    const [disable, setDisable] = useState<Boolean>(false)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>();
    const userValue = useRecoilValue(userState);
    console.log(userValue);

    useEffect(() => {
        if(auth.currentUser) {
            router.push("/dashboard")
        }

        let isMounted = true;

    setTimeout(() => {
      if (isMounted) {
        if(auth.currentUser) {
            router.push("/dashboard")
        }
      }
    }, 1000);

    return () => {
      isMounted = false;
    };
    }, [])

    const router = useRouter()
    

    const onsubmit: SubmitHandler<FormData> = async(data) => {
        setDisable(true);
        console.log(data);
        const {email, password} = data;
        try {
            const {user}: any = await signInWithEmailAndPassword(auth, email, password);
            console.log(user.accessToken);
            TokenHandler(user.accessToken);
            if(user.accessToken) {
                router.push("/dashboard")
            }
        } catch (error) {
            console.log((error as any).message ) ;
        }
        setDisable(false);
    }
    return(
       <>
        <Container>
            <Box sx={{
                display: "flex",
                margin: "30px 0"
            }}>
                <Typography variant="h3" sx={{margin: "auto"}}>Login</Typography>
            </Box>
            <Box sx={WhiteBoard}>

                <form onSubmit={handleSubmit(onsubmit)}>
                    <TextField placeholder="Your Email" {...register("email", { required: true })} error={Boolean(errors.email)} />
                    <TextField type="password" placeholder="Password"  {...register("password", { required: true })} error={Boolean(errors.password)}/>
                    {
                        !disable ? 
                        <Button sx={button} type="submit">Login</Button>
                        :
                        <CircularProgress /> 
                    }
                </form>

            </Box>
        </Container>
       </>
    )
}

export default Login;
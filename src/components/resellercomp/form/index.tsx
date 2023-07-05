'use client'
import { db, auth, createUserWithEmailAndPassword } from "@/services/firebase";
import { colors } from "@/theme/theme";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import {  useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";


interface FormData {
    name: string,
    email: string,
    password: string,
    wallet: string,
    phone: number,
    message: string
}

export default function ResellerForm() {
    const [add, setAdd] = useState<Boolean>(false);
    const { register, handleSubmit,  reset, watch, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data);
        storeToFirebase(data);
    };
    
    const storeToFirebase = async (data: FormData) => {
        setAdd(true);
        
        try {

           let newUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
            if((newUser).user.uid) {
                console.log(newUser.user.uid);
                
            const docRef = await addDoc(collection(db, "resellers"), {...data, uid: newUser.user.uid});
            console.log("Document written with ID: ", docRef.id);
        }

            reset();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        setAdd(false);
    }
    
 return(
    <>
        <Container >
            <Box sx={{
                textAlign: "center",
                margin: "20px 0"
            }}>
                <Typography variant="h2">Become A Resller</Typography>
                <Typography>Sell okra to get paid</Typography>
            </Box>
            <Box sx={{
                backgroundColor: colors.white,
                padding: "20px 40px",
                width: "600px",
                borderRadius: "10px",
                
                margin: "auto",
                form: {
                    all: "inset",
                    display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                rowGap: "10px",

                }
            }}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <TextField placeholder="You're name" {...register("name", { required: true })} error={Boolean(errors.name)}/>
                    <TextField placeholder="Email Address" type="email" {...register("email", { required: true })} error={Boolean(errors.email)}/>
                    <TextField placeholder="Password" type="password" {...register("password", { required: true })} error={Boolean(errors.password)}/>
                    <TextField placeholder="Wallet Address(BEP20)" type="text" {...register("wallet", { required: true })} error={Boolean(errors.wallet)}/>
                    <TextField placeholder="Phone Number" type="number" {...register("phone", { required: true, minLength: 10, maxLength: 12 })} error={Boolean(errors.phone)}/>
                    <TextField placeholder="Message" type="text" {...register("message", { required: true,  })} error={Boolean(errors.message)} />
                    <Button sx={{
                        backgroundColor: colors.mainColor,
                        color: colors.white,
                        padding: "10px 0",
                        ":hover": {
                            backgroundColor: colors.hover
                        }
                    }} 
                    type="submit"
                    disabled={Boolean(add)}
                    >
                    {
                        add ? "Saving..." : "Submit"
                    }
                    </Button>
                </form>
            </Box>
        </Container>
    </>
 )    
}
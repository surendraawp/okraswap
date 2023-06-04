'use client'
// import { useRouter } from "next/router"
import {useRouter, useParams} from "next/navigation";
import { useEffect } from "react";



export default function Page() {
    let router = useParams()
    let search = document.location.search
    let find = new URLSearchParams(search);
    useEffect(() => {
        console.log(find.get('name'), find.get('id'), 'checking');
        // console.log(query, 'checking');
        
    })
    return(
        <>
        <h1>Hello {find.get('name')} { find.get('id')} </h1>
        </>
    )
}
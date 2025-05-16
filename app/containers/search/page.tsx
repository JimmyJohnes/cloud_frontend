"use client"

import { useEffect, useState } from "react";
import SingleImage from "../singleImage";

export default function Search(){
    const [images,setImages] = useState([]);
    function searchImage(formData: FormData){
        if(images){
            fetch("/api/containers/images/search/",{
                method:"POST",
                body:JSON.stringify({
                    imageName:formData.get("imageName")
                })
            }).then((res) => res.json()).then((data)=>{setImages(data)});
        }
        else{
            fetch("/api/containers/images/",{
                method:"GET",
            }).then((res)=>res.json()).then((data)=>{
                setImages(data);
            })
        }
    }
    useEffect(()=>{
        fetch("/api/containers/images/",{
            method:"GET",
        }).then((res)=>res.json()).then((data)=>{
            setImages(data);
        })
    },[])
return(
            <>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4 ">
                <h1 className="text-3xl font-bold">Search</h1>
                <form action={searchImage}className="flex justify-center">
                    <input type="text" name="imageName" placeholder="Search using ID" className="mx-3 px-2 border-1 border-black rounded-lg w-3/4 text-center"/>
                    <button className="py-2 px-6 rounded-full bg-[#ff9900]">Search</button>
                </form>
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4 ">
                <h1 className="text-3xl font-bold">Current Images</h1>
                {
                    images.map((image:any, index:any)=>(
                        <SingleImage key={index} image={image} />
                    ))
                }
            </div>
            </>
);
}
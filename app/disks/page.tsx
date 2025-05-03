"use client"
import { FormEvent, useEffect, useState } from "react";
import SingleDisk from "./singleDisk";

export default function DiskPage(){
    const avaulableDiskFormats= ["raw","qcow2", "vdi (fixed)", "vdi (dynamic)", "vmdk (fixed)","vmdk (dynamic)", "vhdx (fixed)", "vhdx (dynamic)"];
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        const formData = new FormData(event.currentTarget)
        const body = {
            diskName: formData.get("diskName"),
            diskSize: formData.get("diskSize"),
            diskFormat: formData.get("diskFormat")
        }
        const response = await fetch('/api/disks', {
        method: 'POST',
        body: JSON.stringify(body),
        })
    }
    const [availableDisks, setAvaialableDisks] = useState([])
    useEffect(()=>{
    const fetchCurrentDisks = async () =>{
        const response = await fetch('/api/disks', {
        method: 'GET',
        })
        const data = await response.json()
        setAvaialableDisks(data);
    }
    fetchCurrentDisks();

    },[])
    return(
    <div className="p-4">
        <form onSubmit={handleSubmit}>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Create New Virtual Disk</h1>
                <div className="flex justify-evenly">
                    </div>
                <div className="flex justify-evenly">
                    <label>
                    Disk Name:
                    <input required type="text" name="diskName" className="block px-2 border-1 border-black rounded-lg "/>
                    </label>
                    <label>
                    Disk Size (GB):
                    <input required type="number" name="diskSize" className="block px-2 border-1 border-black rounded-lg " min={1}/>
                    </label>
                    <label >
                    Disk Format:
                    <select required name="diskFormat" className="block px-2 border-1 border-black rounded-lg w-40">
                    {avaulableDiskFormats.map((format, index)=><option key={index} value={format}>{format}</option>)}
                    </select>
                    </label>
                    <input type="submit" value="Create Virtual Disk" className="my-1 px-6 rounded-full bg-[#ff9900]"/>
                </div>
            </div>
        </form>
        <h1 className="text-3xl font-bold">Current Virtual disks</h1>
       {availableDisks.map((disk, index)=><SingleDisk key={index} name={disk?.name} size={disk.size} format={disk.format} id={disk._id} location={disk.location} isFixed={disk.isFixed}></SingleDisk>)}
    </div>);
}
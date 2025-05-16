"use client"
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function NewMachineForm(){
    const router = useRouter();
    const availableISOs = [
            {
                name: "Manjaro Linux",
                location: "/home/jimmy/ISO/manjaro-kde-24.0.6-240812-linux69.iso"
            },
            {
                name: "Windows 11",
                location: "/home/jimmy/ISO/tiny11_23H2_x64.iso"
            },
            {
                name: "Endeavour OS",
                location: "/home/jimmy/ISO/EndeavourOS_Endeavour_neo-2024.09.22.iso"
            },
            {
                name: "Debian Linux",
                location: "/home/jimmy/ISO/debian-12.10.0-amd64-DVD-1.iso"
            },
            ];
    const availableMachineTypes= [
        {
            name: "t2micro",
            cpu: 1,
            memory: 1
        },
        {
            name:"t2small",
            cpu:1,
            memory: 2
        },
        {
            name: "t2medium",
            cpu: 2,
            memory: 4
        },
        {
            name:"t2large",
            cpu: 2,
            memory:8
        }
    ] 
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

    const handleSubmit = async (formData:FormData) =>{
        const body = {
            name:formData.get("machineName"),
            iso: availableISOs[parseInt(formData.get("machineImage")!.toString())],
            memory: availableMachineTypes[parseInt(formData.get("machineType")!.toString())],
            image: availableDisks[parseInt(formData.get("machineDisk")!.toString())]
        }
        const response = await fetch('/api/vms', {
        method: 'POST',
        body: JSON.stringify(body),
        })
        router.refresh();
    }
    return(
        <form action={handleSubmit}>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Machine Name</h1>
                <label>Name</label>
                <input type="text" required name="machineName" className="block px-2 border-1 border-black rounded-lg w-3/4"/>
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Application and OS Images </h1>
                <label>OS Image</label>
                <select name="machineImage" className="block px-2 border-1 border-black rounded-lg w-3/4">
                {availableISOs.map((iso, index)=><option key={index} value={index}>{iso.name}</option>)}
                </select>
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Instance Type</h1>
                <label>Machine Type</label>
                <select name="machineType" className="block px-2 border-1 border-black rounded-lg w-3/4">
                {availableMachineTypes.map((machine, index)=><option key={index} value={index}>{machine.name} (vcpus: {machine.cpu}, memory: {machine.memory}G)</option>)}
                </select>
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Configure Storage</h1>
                <label>disk</label>
                <select name="machineDisk" className="block px-2 border-1 border-black rounded-lg w-3/4">
                {availableDisks.map((disk:any, index)=><option key={index} value={index}>{disk.name}</option>)}
                </select>
            </div>
            <div className="flex float-right">
            <input type="submit" value="Create Virutal Machine" className="py-2 px-6 rounded-full bg-[#ff9900]"/>
            </div>
        </form>
    );
}
"use client"
import { useRouter } from "next/navigation";
export default function SingleVM({vm}: any){
    const {_id,name,iso, memory, image} = vm || {};
    const router = useRouter();

    const deleteVm = async () => {
        const response = await fetch(`http://localhost:3000/api/vms`, {
            method: "DELETE",
            body: JSON.stringify({
                id: _id
            })
        })
        router.refresh();
    }
    
    const connetToVm = async() =>{
        const response = await fetch(`http://localhost:3000/api/vms/connect`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                iso: iso,
                memory: memory,
                image: image 
            })
        })
        router.refresh();
    }

    return (
        <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4 ">
            <div>
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-small text-gray-500">OS: {iso.name}</p>
                <p className="text-small text-gray-500">Memory: {memory}GB</p>
            </div>
            <div>
                <button className="block w-full my-1 px-6 rounded-full bg-[#70ab4a]" onClick={connetToVm}>Connect</button>
                <button className="block w-full my-1 px-6 rounded-full bg-[#f95a53]" onClick={deleteVm}>Delete</button>
            </div>
        </div>
    );
}
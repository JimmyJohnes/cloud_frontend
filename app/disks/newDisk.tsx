"use client"
import { useRouter } from "next/navigation"
export default function NewDisk(){
    const router = useRouter();
    const avaulableDiskFormats= ["raw","qcow2", "vdi (fixed)", "vdi (dynamic)", "vmdk (fixed)","vmdk (dynamic)", "vhdx (fixed)", "vhdx (dynamic)"];
    const handleSubmit = async (formData:FormData) =>{
        const body = {
            diskName: formData.get("diskName"),
            diskSize: formData.get("diskSize"),
            diskFormat: formData.get("diskFormat")
        }
        console.log(body)
        const response = await fetch('http://localhost:3000/api/disks', {
        method: 'POST',
        body: JSON.stringify(body),
        })
        router.refresh();
    }
    return(
        <form action={handleSubmit} >
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Create New Virtual Disk</h1>
                <div className="flex justify-evenly flex-wrap">
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
                    <button type="submit" className="my-1 px-6 rounded-full bg-[#ff9900]">Create Virtual Disk</button>
                </div>
                <div>
                    <p className="text-small text-gray-500 text-center">Resize or Edit disk files by writing their name again!</p>
                </div>
            </div>
        </form>
    );

}
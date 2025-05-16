"use client"
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";


export default function NewDockerImage(){
    const router = useRouter();
    const handleFileUpload = async (formData: FormData) => {
        let res = await fetch("http://localhost:3000/api/containers/images",{
            method:"POST",
            body:JSON.stringify({
                "name":formData.get("imageName"),
                "context": formData.get("imageLocation")
            })
        })
        const body = await res.json();
        if(body.status == "success"){
            toast("Container Image Created Successfully");
        }
        setTimeout(()=>{
            router.push("/containers");
        },3000)
    };
    const pullFromDockerHub = async (formData:FormData) =>{
        let res = await fetch("http://localhost:3000/api/containers/images/pull",{
            method:"POST",
            body:JSON.stringify({
                "name":formData.get("imageName"),
            })
        })
        const body = await res.json();
        if(body.status == "success"){
            toast("Stared Pulling Image");
        }
        setTimeout(()=>{
            router.push("/containers");
        },3000)
    }
    return (
        <div>
            <ToastContainer/>
            <div className="border-r-1 border-gray-400 p-8 h-svh">
                <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                    <h1 className="text-3xl font-bold text-center">Image Upload</h1>
                    <form action={handleFileUpload}>
                        <label className="block">
                            Image name 
                            <input type="text" name="imageName" className="mx-3 block px-2 border-1 border-black rounded-lg w-3/4"/>
                        </label>
                        <label className="block">
                            Directory with Image
                            <input type="text" name="imageLocation" className="mx-3 block px-2 border-1 border-black rounded-lg w-3/4"/>
                        </label>
                        <br></br>
                        <button type="submit" className="py-2 px-6 rounded-full bg-[#ff9900]">Submit</button>
                    </form>
                </div>
                <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                    <h1 className="text-3xl font-bold text-center">DockerHub</h1>
                    <form action={pullFromDockerHub}>
                        <label className="block">
                            Image name 
                            <input type="text" name="imageName" className="mx-3 block px-2 border-1 border-black rounded-lg w-3/4"/>
                        </label>
                        <br></br>
                        <button type="submit" className="py-2 px-6 rounded-full bg-[#ff9900]">Pull</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
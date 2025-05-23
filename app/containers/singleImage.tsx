"use client"
import { useRouter } from "next/navigation";

export default function singleImage({image}: any){
    // console.log(image)
    const router = useRouter();
    const deleteImage = async () => {
        const response = await fetch(`http://localhost:3000/api/containers/images`, {
            method: 'DELETE',
            body:JSON.stringify({
                name:image.RepoTags[0]
            })
        });
        router.refresh()
    }
    const createAContainer= async () => {
        const response = await fetch(`http://localhost:3000/api/containers/`, {
            method: 'POST',
            body:JSON.stringify({
                image:image.Id
            })
        });
        router.refresh()
    }
    return(
        <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4 flex justify-between">
            <div className="block">
                <h1 className="text-3xl font-bold">{image.RepoTags[0]}</h1>
            </div>
            <div>
                <button className="text-blue-600 text-4xl" onClick={createAContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                </button>
                <button className="text-red-900 text-4xl" onClick={deleteImage}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    );

}
"use client"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
export default function ContainerButton({src, text, alt, linkTo}: any){
    const router = useRouter();
    const pathname = usePathname();
    return(
                    <button className="shadow-2xl border rounded-xl mx-4 hover:opacity-75" onClick={()=>router.push(`${pathname}/${linkTo}`)}>
                        <Image src={src} width={200} height={200} alt={alt}/>
                        <div className="p-4 border-t">
                            <p>
                                {text}
                            </p>
                        </div>
                    </button>
    );
}
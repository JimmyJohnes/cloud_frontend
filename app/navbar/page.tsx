"use client"
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./searchBar/page";

export default function NavBar(){
    const [isHidden,setIsHidden] = useState(true);
    let handleHidden = () => {
        let commonStyle = "absolute top-8 z-1000 bg-[#1a222c] w-72 text-white border-1 border-[#3d424c] p-4"
        if (isHidden) return commonStyle+" hidden" 
        return commonStyle 
    };
    return(
        <nav>
            <div
            className="h-12 w-full bg-[#161d26] flex justify-between content-center float-left text-white p-3 "
            >
                <div
                className="hover:text-[#75cfff]"
                onClick={()=>setIsHidden(!isHidden)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="4" height="4" rx="1" fill="currentColor"></rect><rect y="6" width="4" height="4" rx="1" fill="currentColor"></rect><rect y="12" width="4" height="4" rx="1" fill="currentColor"></rect><rect x="6" width="4" height="4" rx="1" fill="currentColor"></rect><rect x="6" y="6" width="4" height="4" rx="1" fill="currentColor"></rect><rect x="6" y="12" width="4" height="4" rx="1" fill="currentColor"></rect><rect x="12" width="4" height="4" rx="1" fill="currentColor"></rect><rect x="12" y="6" width="4" height="4" rx="1" fill="currentColor"></rect><rect x="12" y="12" width="4" height="4" rx="1" fill="currentColor"></rect></svg>
                </div>
                <SearchBar></SearchBar>
                <div></div>
            </div>
            <div className={handleHidden()}>
                <div className="block w-full m-4 text-bold text-l text-gray-400 hover:text-white">
                    <Link href="/disks">Virtual Disks</Link>
                </div>
                <div className="block w-full m-4 text-bold text-l text-gray-400 hover:text-white">
                    <Link href="/vms">Virtual Machines</Link>
                </div>
                <div className="block w-full m-4 text-bold text-l text-gray-400 hover:text-white">
                    <Link href="/containers">Containers</Link>
                </div>
            </div>
        </nav>
    );
}
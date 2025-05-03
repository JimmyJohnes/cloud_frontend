"use client"
import { useState } from "react";

export default function SearchBar(){
    const [searchText, setSearchText] = useState("")
    return(
        <div className="relative flex w-64">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-gray-400"
            >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </div>
        
        <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-400 py-1 px-10 rounded border border-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search"
        />
        </div>
    );
}
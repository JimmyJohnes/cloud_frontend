"use client"
import { use, useEffect, useState } from "react";
import "highlight.js/styles/github.css";

import hljs from 'highlight.js';

export default function NewDockerFile(){
    const [baseImage,setBaseImage] = useState("");
    const [wrkdir,setWrkdir] = useState("");
    const [exposedPorts, setExposedPorts] = useState("")
    const [runCommand, setRunCommand] = useState("")
    const [CMDCommandToAdd, setNewCMDCommand] = useState("")
    const [cmdCommand, setCMDCommand] = useState([])
    let code = `
    ${baseImage}
    ${wrkdir}
    ${runCommand}
    ${exposedPorts}
    `
    if (cmdCommand.length > 0){
        let partToAdd = "CMD [";
        cmdCommand.forEach((cmd)=>{
            partToAdd += `"${cmd}"`;
            if (cmdCommand.indexOf(cmd) != cmdCommand.length-1){
                partToAdd += ",";
            }
        })
        partToAdd += "]";
        code += partToAdd
    }
    const addToCMD = () =>{
        let newCMDCommand = [...cmdCommand,CMDCommandToAdd];
        setCMDCommand(newCMDCommand);
    }
    const deleteCMD = (index: number) =>{
        let newCMDCommand = [...cmdCommand];
        newCMDCommand.splice(index,1);
        setCMDCommand(newCMDCommand);
    }
    useEffect(()=>{
        document.querySelectorAll('code').forEach((el) => {
            delete el.dataset.highlighted;
        });
        hljs.highlightAll();
    })

    const saveToFile = () =>{
        let link = document.createElement('a');
        link.setAttribute("download", "generated.Dockerfile")
        link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
        link.click();
        return false;
    }
    return(
        <div className="grid grid-cols-2 h-full w-full">
            <div className="border-r-1 border-gray-400 p-8 h-svh">
                <h1 className="text-3xl font-bold text-center">Create New DockerFile</h1>
                <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                    <h1 className="text-3xl font-bold">Base Image & Directory</h1>
                    <label>Name From DockerHub</label>
                    <input type="text" required name="machineName" className="block px-2 border-1 border-black rounded-lg w-3/4" onChange={(e)=>{
                        e.target.value? setBaseImage("FROM "+e.target.value) : setBaseImage("")
                        }}/>
                    <label>Work Directory</label>
                    <input type="text" required name="machineName" className="block px-2 border-1 border-black rounded-lg w-3/4" onChange={(e)=>{
                        e.target.value? setWrkdir("WORKDIR "+e.target.value + "\n    COPY . .") : setWrkdir("")
                        }}/>
                    <label>Project Directory</label>
                </div>
                <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                    <h1 className="text-3xl font-bold">Exposed Ports</h1>
                    <label>Port Numbers separated by space</label>
                    <input type="text" required name="machineName" className="block px-2 border-1 border-black rounded-lg w-3/4" onChange={(e)=>{
                        e.target.value? setExposedPorts("EXPOSE "+e.target.value) : setExposedPorts("")
                        }}/>
                </div>
                <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                    <h1 className="text-3xl font-bold">Commands</h1>
                    <label>during container build time</label>
                    <input type="text" required name="machineName" className="block px-2 border-1 border-black rounded-lg w-3/4" onChange={(e)=>{setRunCommand("RUN "+e.target.value)}}/>
                    <label className="block">during container runtime</label>
                    <input type="text" required name="machineName" className="mr-2 px-2 border-1 border-black rounded-lg w-3/4" onChange={(e)=>{setNewCMDCommand(e.target.value)}}/>
                    <button className="rounded bg-black text-white p-2" onClick={addToCMD}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    {
                        cmdCommand.map((cmd,index)=>{
                            return(
                                <div key={index} className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4 flex justify-between">
                                    <p className="text-xl font-bold">{cmd}</p>
                                    <button className="text-red-900 text-4xl" onClick={()=>deleteCMD(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="border-l-1 border-gray-400 p-8 h-svh">
                <h1 className="text-3xl font-bold text-center">DockerFile Code</h1>
                <pre>
                    <code className="language-dockerfile" id="code">
                        {code}
                    </code>
                </pre>
                <div className="flex h-100 items-end">
                    <button className="my-1 h-fit px-6 py-2 rounded-full bg-[#ff9900]" onClick={saveToFile}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download
                    </button>
                </div>
            </div>
        </div>
    )
}
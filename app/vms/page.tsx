import NewMachineForm from "./newVm/page";
import SingleVM from "./singleVM";

async function fetchVms() {
    const res = await fetch("http://localhost:3000/api/vms", {method: "GET"});
    const data = await res.json();
    return data;
}


export default async function VMPage(){
const vms = await fetchVms();
    return(<>
        <div className="grid grid-cols-2 h-full w-full">
            <div className="border-r-1 border-gray-400 p-8 h-svh">
            <h1 className="text-3xl font-bold">Create New Virtual Machine</h1>
                <NewMachineForm></NewMachineForm>
            </div>
            <div className="border-l-1 border-gray-400 p-8 h-svh">
            <h1 className="text-3xl font-bold">Current Virtual Machines</h1>
            <div className="flex flex-wrap">
            {
                vms.map((vm: any,index: any)=><SingleVM key={index} vm={vm}></SingleVM>)
            }
            </div>
            </div>

        </div>
    </>);
}
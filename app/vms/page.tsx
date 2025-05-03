import NewMachineForm from "./newVm/page";
export default function VMPage(){
    return(<>
        <div className="grid grid-cols-2 h-full w-full">
            <div className="border-r-1 border-gray-400 p-8 h-svh">
            <h1 className="text-3xl font-bold">Create New Virtual Machine</h1>
                <NewMachineForm></NewMachineForm>
            </div>
            <div className="border-l-1 border-gray-400 p-8 h-svh">
            <h1 className="text-3xl font-bold">Current Virtual Machines</h1>
            </div>

        </div>
    </>);
}
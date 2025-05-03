export default function NewMachineForm(){
    const availableISOs = ["Manjaro Linux","Windows 11","Endeavour OS","Debian Linux"];
    const availableMachineTypes= [
        {
            name: "t2micro",
            cpu: 1,
            memory: 1
        },
        {
            name:"t2small",
            cpu:1,
            memory: 2
        },
        {
            name: "t2medium",
            cpu: 2,
            memory: 4
        },
        {
            name:"t2large",
            cpu: 2,
            memory:8
        }
    ] 
    const availableDisks = ["todo"]
    return(
        <form>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Machine Name</h1>
                <label>Name</label>
                <input type="text" name="machineName" className="block px-2 border-1 border-black rounded-lg w-3/4"/>
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Application and OS Images </h1>
                <label>OS Image</label>
                <select name="machineImage" className="block px-2 border-1 border-black rounded-lg w-3/4">
                {availableISOs.map((iso, index)=><option key={index} value={iso}>{iso}</option>)}
                </select>
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Instance Type</h1>
                <label>Machine Type</label>
                <select name="machineType" className="block px-2 border-1 border-black rounded-lg w-3/4">
                {availableMachineTypes.map((machine, index)=><option key={index} value={machine.name}>{machine.name} (vcpus: {machine.cpu}, memory: {machine.memory}G)</option>)}
                </select>
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Configure Storage</h1>
                <label>disk</label>
                <select name="machineDisk" className="block px-2 border-1 border-black rounded-lg w-3/4">
                {availableDisks.map((disk, index)=><option key={index} value={disk}>{disk}</option>)}
                </select>
            </div>
            <div className="flex float-right">
            <input type="submit" value="Create Virtual Machine" className="py-2 px-6 rounded-full bg-[#ff9900]"/>
            </div>
        </form>
    );
}
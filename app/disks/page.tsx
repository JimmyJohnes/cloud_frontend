export default function DiskPage(){
    const avaulableDiskFormats= ["raw","qcow2", "vdi (fixed)", "vdi (dynamic)", "vmdk (fixed)","vmdk (dynamic)", "vhdx (fixed)", "vhdx (dynamic)"];
    return(
    <div className="p-4">
        <form>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4">
                <h1 className="text-3xl font-bold">Create New Virtual Disk</h1>
                <div className="flex justify-evenly">
                    </div>
                <div className="flex justify-evenly">
                    <label>
                    Disk Name:
                    <input type="text" name="diskName" className="block px-2 border-1 border-black rounded-lg "/>
                    </label>
                    <label>
                    Disk Size (GB):
                    <input type="number" name="diskSize" className="block px-2 border-1 border-black rounded-lg "/>
                    </label>
                    <label >
                    Disk Format:
                    <select name="machineImage" className="block px-2 border-1 border-black rounded-lg w-40">
                    {avaulableDiskFormats.map((format, index)=><option key={index} value={format}>{format}</option>)}
                    </select>
                    </label>
                    <input type="submit" value="Create Virtual Disk" className="my-1 px-6 rounded-full bg-[#ff9900]"/>
                </div>
            </div>
        </form>
        <h1 className="text-3xl font-bold">Current Virtual disks</h1>
    </div>);
}
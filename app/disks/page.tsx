import SingleDisk from "./singleDisk";
import NewDisk from "./newDisk";

export default async function DiskPage(){
    const response = await fetch('http://localhost:3000/api/disks', {
    method: 'GET',
    })
    const availableDisks = await response.json()
    
    return(
    <div className="p-4">
        <NewDisk></NewDisk>
        <h1 className="text-3xl font-bold">Current Virtual disks</h1>
        {
            availableDisks.map((disk:any, index:number) => {
            return <SingleDisk key={index} disk={disk}/>
        })
        }
    </div>);
}
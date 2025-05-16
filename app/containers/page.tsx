
import ContainerButton from "./container_button";
import SingleContainer from "./singleContainer";
import SingleImage from "./singleImage";

export default async function Containers(){
    const currenImages = await (await fetch("http://localhost:3000/api/containers/images",{cache: "no-store"})).json()
    const currentContainers = await (await fetch("http://localhost:3000/api/containers",{cache: "no-store"})).json()
    return(
    <div className="p-4">
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4 ">
                <h1 className="text-3xl font-bold">Create New</h1>
                <div className="flex justify-center">
                    <ContainerButton src="/dockerfile.png" text="DockerFile" alt="image of a dockerfile" linkTo="/newdockerfile"></ContainerButton>
                    <ContainerButton src="/docker_image.png" text="Docker Image" alt="image of a docker container" linkTo="/newdockerimage"></ContainerButton>
                </div>
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4 ">
                <h1 className="text-3xl font-bold">Search</h1>
                <div className="flex justify-center">
                    <ContainerButton src="/search.png" text="Search Image" alt="image of a search icon" linkTo="/search"></ContainerButton>
                    <ContainerButton src="/dockerhub.png" text="Search DockerHub" alt="image of DockerHub" linkTo="/dockerhub"></ContainerButton>
                </div>
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4 ">
                <h1 className="text-3xl font-bold">Current Images</h1>
                {currenImages.map((image:any, index:any)=>(
                    <SingleImage key={index} image={image} />
                ))}
            </div>
            <div className="m-4 border-2 border-[#c6c6cd] rounded-lg p-4 ">
                <h1 className="text-3xl font-bold">Current Containers</h1>
                {
                    currentContainers.map((container:any, index:any)=>(
                        <SingleContainer key={index} container={container} />
                    ))
                }
            </div>
    </div>
    );
}
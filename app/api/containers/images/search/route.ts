import { NextRequest, NextResponse } from "next/server";
import Docker from "dockerode";
const docker = new Docker();

export async function POST(req:NextRequest){
  const body = await req.json();
  const containers = await docker.listImages();
  const filteredContainers = containers.filter((container)=>{
    return container.RepoTags?.some((tag)=>tag.includes(body.imageName))
  })
  console.log(filteredContainers)
  return NextResponse.json(filteredContainers);
}
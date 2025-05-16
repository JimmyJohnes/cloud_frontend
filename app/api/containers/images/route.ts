import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import Docker from "dockerode";
const docker = new Docker();

export async function GET(){
  const containers = await docker.listImages();
  return NextResponse.json(containers);
}

export async function POST(
  request:NextRequest
) {
  const body = await request.json();
  await docker.buildImage({
    context:body.context,
    src:["Dockerfile"]
  },{t:body.name}, (err,res)=>{console.log(err)});

  return new Response(JSON.stringify({
    status: "success",
    message: "Image created"
  }));
}


export async function DELETE(
  request:NextRequest
) {
  const body = await request.json();
  const image = docker.getImage(body.name);
  await image.remove();
  return new Response("all done");
}
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import Docker from "dockerode";
import { exec } from "node:child_process";
const docker = new Docker();

export async function GET(){
  const containers = await docker.listContainers({all: false});
  return NextResponse.json(containers);
}

export async function POST(
  request:NextRequest
) {
  const body = await request.json();
  console.log(body.image)
  exec("docker run --rm " + body.image, (err,stdout) => console.log(err,stdout))
  return new Response(JSON.stringify({
    status: "success",
    message: "Image created"
  }));
}


export async function DELETE(
  request:NextRequest
) {
  const body = await request.json();
  const container = docker.getContainer(body.id);
  await container.stop({},(err,res)=>console.log(err));
  return new Response("all done");
}
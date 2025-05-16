
import { NextRequest, NextResponse } from "next/server";
import Docker from "dockerode";
import { exec } from "node:child_process";
const docker = new Docker();
export async function POST(
  request:NextRequest
) {
  const body = await request.json();
  exec("docker pull " + body.name ,(err,stdout)=>console.log(err,stdout))
  return new Response(JSON.stringify({
    status: "success",
    message: "Image created"
  }));
}

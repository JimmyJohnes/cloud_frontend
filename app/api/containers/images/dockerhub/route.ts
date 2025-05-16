import { NextRequest, NextResponse } from "next/server";
import Docker from "dockerode";
import { exec, execSync } from "node:child_process";
const docker = new Docker();
export async function POST(
  request:NextRequest
) {
  const body = await request.json();
  console.log(body);
  let res = execSync("docker search " + body.name)
  console.log(res.toString());
  return new Response(JSON.stringify({
    status: "success",
    message: res.toString()
  }));
}

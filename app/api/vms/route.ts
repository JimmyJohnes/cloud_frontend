import { NextRequest, NextResponse } from "next/server";
import VM from "./(models)/vm.model";

export async function GET(){
  const vms = await VM.find({});
  return new Response(JSON.stringify(vms))
}

export async function POST(
  request:NextRequest
) {
  const body = await request.json();
  const newVM = {
    name: body.name,
    iso: body.iso,
    memory: body.memory.memory,
    image: body.image._id
  }
  await VM.findOneAndUpdate({name: body.name},{$set: newVM},{upsert: true, new:true});
  return new Response("all done");
}


export async function DELETE(
  request:NextRequest
) {
  const body = await request.json();
  await VM.findByIdAndDelete(body.id);
  return new Response("all done");
}
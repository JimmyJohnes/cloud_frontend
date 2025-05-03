import { QEMUImage } from "../(qemu)/image.model";
import { ISOImage } from "../(qemu)/iso.model";
import { QEMU } from "../(qemu)/qemu";
import { NextRequest, NextResponse } from "next/server";
const qemu = new QEMU("/home/jimmy/nvim/cloud_project/images")

export async function POST(
  request:NextRequest
) {
  const body = await request.json();
  const newVM = {
    name: body.name,
    iso: new ISOImage(body.iso.name,body.iso.location),
    memory: body.memory.memory,
    image: new QEMUImage(body.image.name,parseInt(body.image.size),body.image.isFixed,body.image.format, body.image.location)
  }
  let res  = qemu.createVirtualMachineUsingImage(newVM.name,newVM.iso, newVM.memory,newVM.image)
  console.log(res)
  
  return new Response("all done");
}
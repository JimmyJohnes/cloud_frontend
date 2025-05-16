import { QEMUImage } from "../../(qemu)/image.model";
import { ISOImage } from "../../(qemu)/iso.model";
import { QEMU } from "../../(qemu)/qemu";
import { NextRequest, NextResponse } from "next/server";
import VM from "../(models)/vm.model";
import { DiskModel } from "../../disks/(models)/disk.model";
const qemu = new QEMU("/home/jimmy/nvim/cloud_project/images")

export async function POST(
  request:NextRequest
) {
  const body = await request.json();
  const image = await DiskModel.findById(body.image)
  const newVM = {
    name: body.name,
    iso: new ISOImage(body.iso.name,body.iso.location),
    memory: body.memory,
    image: new QEMUImage(image.name,parseInt(image.size),image.isFixed,image.format, image.location)
  }
  console.log(newVM);
  let res  = qemu.createVirtualMachineUsingImage(newVM.name,newVM.iso, newVM.memory,newVM.image)
  return new Response("all done");
}
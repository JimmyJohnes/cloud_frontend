import { NextRequest, NextResponse } from "next/server";
import { QEMU } from "../(qemu)/qemu";
import "../(db)/dbConnection";
import DiskModel from "./(models)/disk.model";
import { QEMUImage } from "../(qemu)/image.model";
const qemu = new QEMU("/home/jimmy/nvim/cloud_project/images");

export async function GET(){
  const disks = await DiskModel.find({});
  return new Response(JSON.stringify(disks))
}

export async function POST(
  request:NextRequest
) {
  const body = await request.json();
  const newDisk = {
    name: body.diskName,
    size: body.diskSize,
    isFixed: false,
    format: "qcow2",
  }
  if(!["raw","qcow2"].includes(body.diskFormat)){
    if(body.diskFormat.includes("fixed")) {
      newDisk.isFixed = true;
      switch (true) {
        case body.diskFormat.includes("vdi"):
          newDisk.format = "vdi -o static=on"
          break;
        case body.diskFormat.includes("vmdk"):
          newDisk.format = "vmdk -o subformat=monolithicFlat"
          break;
        case body.diskFormat.includes("vhdx"):
          newDisk.format = "vhdx -o subformat=fixed"
          break;
      }
    }
    if(body.diskFormat.includes("dynamic")) {
      newDisk.isFixed = false;
      switch (true) {
        case body.diskFormat.includes("vdi"):
          newDisk.format = "vdi"
          break;
        case body.diskFormat.includes("vmdk"):
          newDisk.format = "vmdk"
          break;
        case body.diskFormat.includes("vhdx"):
          newDisk.format = "vhdx"
          break;
      }
    }
  }
  else{
    newDisk.format = body.diskFormat;
  }
  let res = qemu.createVirtualDisk(newDisk.name,newDisk.size,newDisk.isFixed,newDisk.format)
  console.log(res.image?.properties);
  let newImage = new DiskModel(res.image?.properties);
  newImage.save();
  return new Response(JSON.stringify(res));
}

export async function DELETE(request: NextRequest){
  const body = await request.json();
  const imageToDelete = new QEMUImage(body.name, body.size, body.isFixed,body.format, body.location);
  let foo = qemu.deleteVirtualDiskFromImage(imageToDelete);
  console.log(imageToDelete.properties);
  console.log(foo);
  if(foo.status != "failes"){
    await DiskModel.findByIdAndDelete(body.id);
  }
  return new Response("Disk deleted successfully")
}
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`./public/${file.name}`, buffer);

  return NextResponse.json({ status: "success" });
}

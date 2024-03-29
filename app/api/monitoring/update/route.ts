import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    id,
    text,
    isUp,
    dateDown,
    bases,
  }: {
    id: string;
    text?: string;
    isUp?: boolean;
    dateDown?: Date;
    bases?: string[];
  } = body;

  const updateData: any = {};

  // Include only defined fields in the updateData object:
  if (isUp !== undefined) {
    updateData.isUp = isUp;
  }
  if (dateDown !== undefined) {
    updateData.dateDown = dateDown;
  }
  if (bases !== undefined) {
    updateData.bases = bases;
  }
  if (text !== undefined) {
    updateData.text = text;
  }

  const monitoring = await prisma.monitoring.update({
    where: {
      id,
    },
    data: updateData,
  });

  console.log(monitoring);

  return NextResponse.json(monitoring);
}

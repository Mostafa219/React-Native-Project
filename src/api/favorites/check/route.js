import { connectDB } from "../../../../lib/db";
import Favorite from "../../../../lib/models/Favorite";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { id } = await request.json();

  const exists = await Favorite.findOne({ id });
  if (exists) {
    return NextResponse.json({ exists: true });
  }

  return NextResponse.json({ exists: false });
}

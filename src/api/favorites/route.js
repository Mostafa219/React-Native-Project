import Favorite from "../../../lib/models/Favorite";
import { connectDB } from "../../../lib/db";
import { NextResponse } from "next/server";

// ✅ GET
export async function GET() {
  await connectDB();
  const favorites = await Favorite.find({});
  return NextResponse.json(favorites);
}

// ✅ POST:
export async function POST(request) {
  await connectDB();
  const body = await request.json();

  const exists = await Favorite.findOne({ id: body.id });
  if (exists) {
    return NextResponse.json(
      { message: "Favorite already exists" },
      { status: 400 }
    );
  }

  const favorite = await Favorite.create(body);
  return NextResponse.json(favorite);
}

// DELETE:
export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json();

  const deleted = await Favorite.findOneAndDelete({ id });
  if (!deleted) {
    return NextResponse.json(
      { message: "Favorite not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: `Favorite ${id} deleted` });
}

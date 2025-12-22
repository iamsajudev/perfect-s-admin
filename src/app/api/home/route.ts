// app/api/home/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Home from "@/models/Home";

// GET: Fetch home data (single document)
export async function GET() {
  try {
    await connectDB();

    // Find the single home document
    let homeData = await Home.findOne();

    // If no document exists, create one with default values
    if (!homeData) {
      homeData = await Home.create({});
    }

    return NextResponse.json(homeData);
  } catch (error) {
    console.error("Error fetching home data:", error);
    return NextResponse.json(
      { error: "Failed to fetch home data" },
      { status: 500 }
    );
  }
}

// POST: Update home data
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    // Find the single home document and update it
    // upsert: true creates the document if it doesn't exist
    const homeData = await Home.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json({
      message: "Home data updated successfully",
      data: homeData,
    });
  } catch (error) {
    console.error("Error updating home data:", error);
    return NextResponse.json(
      { error: "Failed to update home data" },
      { status: 500 }
    );
  }
}

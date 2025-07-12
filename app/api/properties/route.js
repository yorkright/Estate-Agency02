// app/api/properties/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Property from "@/models/Property";

// ✅ GET: Get all properties or a single property by ID
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("id");

    if (propertyId) {
      const property = await Property.findById(propertyId);

      if (!property) {
        return NextResponse.json(
          { success: false, message: "Property not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: property }, { status: 200 });
    }

    const properties = await Property.find().sort({ createdAt: -1 }); // Newest first
    return NextResponse.json({ success: true, count: properties.length, data: properties }, { status: 200 });
  } catch (error) {
    console.error("❌ GET /api/properties error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST: Add new property
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ✅ Optional basic validation
    if (!body.title || !body.price || !body.address) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (title, price, address)" },
        { status: 400 }
      );
    }

    const newProperty = await Property.create(body);

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/properties error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// app/api/properties/route.js
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Property from "../../../models/Property";


export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get('id')

    if (propertyId) {
      const property = await Property.findById(propertyId)
      if (!property) {
        return NextResponse.json({ success: false, msg: "Property not found" }, { status: 404 });
      }
      return NextResponse.json(property)
    }

    
    const properties = await Property.find({})
    return NextResponse.json({ success: true, properties })

  } catch (error) {

    console.error("GET error:", error);

    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });

  }

}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const property = await Property.create(body);
    return Response.json({ success: true, data: property });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}  

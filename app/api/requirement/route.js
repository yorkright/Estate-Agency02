// app/api/requirement/route.js
import { NextResponse } from "next/server";
import Requirement from "../../../models/Requirement";
import { connectDB } from "../../../lib/db";



export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, propertyType, budget, location, message } = body;

    if (!name || !email || !propertyType) {
      return NextResponse.json(
        { error: "Name, Email, and Property Type are required" },
        { status: 400 }
      );
    }

    await connectDB();
    
    const newRequirement = new Requirement({
      name,
      email,
      phone,
      propertyType,
      budget,
      location,
      message,
    });

    await newRequirement.save();

    return NextResponse.json(
      { success: true, message: "Requirement submitted successfully Our Agent Contact you within 24hrs ⏱" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

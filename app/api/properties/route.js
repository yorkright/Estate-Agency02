import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import crypto from "crypto";


import { connectDB } from "../../../lib/db";
import Property from "../../../models/Property";

// Force dynamic so GET results aren't statically cached.
export const dynamic = "force-dynamic";
export const revalidate = 0;


const uploadsDir = path.join(process.cwd(), "public", "uploads");
async function ensureUploadsDir() {
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
  } catch (err) {
    // ignore EEXIST; rethrow otherwise
    if (err.code !== "EEXIST") throw err;
  }
}


function cleanString(v) {
  if (Array.isArray(v)) v = v[0]; // defensive guard (formidable-style arrays)
  if (typeof v !== "string") v = v == null ? "" : String(v);
  return v.trim();
}

function toNumber(v) {
  if (Array.isArray(v)) v = v[0];
  if (v === "" || v == null) return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
}

/**
 * Persist a File (from Request.formData()) to /public/uploads and return
 * a relative public URL path (\"/uploads/<filename>\").
 */
async function saveUploadFile(file, prefix) {
  if (!file) return null;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Derive safe ext from filename OR mime
  const origName = file.name || `${prefix}`;
  const extFromName = path.extname(origName);
  const fallbackExt = mimeExtFromType(file.type) || ".dat";
  const ext = extFromName || fallbackExt;

  const filename = `${prefix}-${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const filepath = path.join(uploadsDir, filename);

  await fs.writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

/**
 * Minimal mime -> extension helper (fallback only; not exhaustive).
 */
function mimeExtFromType(mime = "") {
  if (mime.startsWith("image/")) {
    const sub = mime.split("/")[1];
    if (sub === "jpeg" || sub === "pjpeg") return ".jpg";
    if (sub === "png") return ".png";
    if (sub === "gif") return ".gif";
    if (sub === "webp") return ".webp";
    if (sub === "svg+xml") return ".svg";
    return ".img";
  }
  if (mime.startsWith("video/")) {
    const sub = mime.split("/")[1];
    if (sub === "mp4") return ".mp4";
    if (sub === "webm") return ".webm";
    if (sub === "ogg") return ".ogv";
    return ".vid";
  }
  return null;
}

// GET  /api/properties   OR   /api/properties?id=<id>

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Find single property by ID
      const property = await Property.findById(id).lean();
      if (!property) {
        return NextResponse.json(
          { success: false, error: "Property not found." },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, property });
    }

    // Fetch all properties sorted by latest
    const properties = await Property.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, properties });
  } catch (error) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    );
  }
}


// POST /api/properties   (multipart/form-data preferred)
// Fields expected:
//   title, description, price, location, type, bedrooms, bathrooms
//   image (File, required), video (File, optional)



export async function POST(req) {
  try {
    await connectDB();
    await ensureUploadsDir();

    const contentType = req.headers.get("content-type") || "";


    // MULTIPART FORM-DATA


    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      // Extract and clean textual fields
      const title = cleanString(formData.get("title"));
      const description = cleanString(formData.get("description"));
      const price = toNumber(formData.get("price"));
      const location = cleanString(formData.get("location"));
      const type = cleanString(formData.get("type"));
      const bedrooms = toNumber(formData.get("bedrooms"));
      const bathrooms = toNumber(formData.get("bathrooms"));

      // Basic required field validation
      const missing = [];
      if (!title) missing.push("title");
      if (!description) missing.push("description");
      if (price == null) missing.push("price");
      if (!location) missing.push("location");
      if (!type) missing.push("type");
      if (bedrooms == null) missing.push("bedrooms");
      if (bathrooms == null) missing.push("bathrooms");

      // Files
      const imageFile = formData.get("image");
      const videoFile = formData.get("video"); // may be null

      if (!imageFile || typeof imageFile !== "object" || !("arrayBuffer" in imageFile)) {
        missing.push("image");
      }

      if (missing.length) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing or invalid fields: ${missing.join(", ")}.`,
          },
          { status: 400 }
        );
      }

      // Persist files
      const imagePath = await saveUploadFile(imageFile, "property-image");
      const videoPath = videoFile && typeof videoFile === "object" && "arrayBuffer" in videoFile
        ? await saveUploadFile(videoFile, "property-video")
        : "";

      // Create Property
      const newProperty = await Property.create({
        title,
        description,
        price,
        location,
        type,
        bedrooms,
        bathrooms,
        image: imagePath,
        video: videoPath,
      });

      return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
    }


    // JSON FALLBACK (no file upload — assume client provides image/video URLs)
    
    
    const data = await req.json().catch(() => null);
    if (!data) {
      return NextResponse.json(
        { success: false, error: "Unsupported content type. Use multipart/form-data or JSON." },
        { status: 400 }
      );
    }

    const title = cleanString(data.title);
    const description = cleanString(data.description);
    const price = toNumber(data.price);
    const location = cleanString(data.location);
    const type = cleanString(data.type);
    const bedrooms = toNumber(data.bedrooms);
    const bathrooms = toNumber(data.bathrooms);
    const image = cleanString(data.image); // expecting URL or relative path
    const video = cleanString(data.video); // optional

    const missing = [];
    if (!title) missing.push("title");
    if (!description) missing.push("description");
    if (price == null) missing.push("price");
    if (!location) missing.push("location");
    if (!type) missing.push("type");
    if (bedrooms == null) missing.push("bedrooms");
    if (bathrooms == null) missing.push("bathrooms");
    if (!image) missing.push("image");

    if (missing.length) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missing.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    const newProperty = await Property.create({
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      image,
      video,
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error." },
      { status: 500 }
    );
  }
}

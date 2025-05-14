// app/api/contact/route.js
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const contact = await Contact.create(body);
    return new Response(JSON.stringify(contact), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to submit contact form' }), { status: 500 });
  }
}

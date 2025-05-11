import dbConnect from '@/config/mongodb';
import Message from '@/model/Message';

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
  }

  try {
    await dbConnect();
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}


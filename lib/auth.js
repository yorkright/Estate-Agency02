// lib/auth.js
import jwt from 'jsonwebtoken'; // You'll need to install this: npm install jsonwebtoken

export async function verifyAuthToken(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null; // No token or malformed token
    }

    const token = authHeader.split(' ')[1]; // Get the token part

    // Replace 'YOUR_JWT_SECRET' with your actual secret key from environment variables
    // This secret must be securely stored and not exposed in client-side code.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming your JWT payload contains a 'userId' field
    if (decoded && decoded.userId) {
      return decoded.userId;
    }

    return null; // Token valid but no userId in payload, or other issue
  } catch (error) {
    console.error("Auth token verification failed:", error.message);
    // Handle specific JWT errors like TokenExpiredError, JsonWebTokenError
    return null; // Authentication failed
  }
}
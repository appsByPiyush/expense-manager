import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await dbConnect();

  const { email, password, username } = await req.json();

  try {
    const user = await User.create({ email, password, username });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'User registration failed', error }, { status: 400 });
  }
}

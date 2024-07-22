import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const response = await axios.post('http://localhost:8000/answer_question', { query: messages });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching data from the backend.' }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simulate simple validation
    const required = ["firstName", "lastName", "email", "password"] as const;
    for (const key of required) {
      if (!body?.[key]) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
      }
    }

    // Here you would create the user in your DB
    // For now, just return success
    return NextResponse.json({ success: true, userId: "demo-user-id" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

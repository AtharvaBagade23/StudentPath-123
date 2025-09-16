import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT c.id, c.college_name, c.college_type, c.city, c.state, c.country,
              ct.usage_count, ct.max_usage, ct.is_active, ct.expires_at
       FROM colleges c 
       JOIN college_tokens ct ON c.id = ct.college_id 
       WHERE ct.token = ? AND ct.is_active = TRUE AND c.is_active = TRUE
       LIMIT 1`,
      [token]
    );

    connection.release();

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 404 }
      );
    }

    const tokenData = rows[0] as any;

    // Check if token usage limit exceeded
    if (tokenData.usage_count >= tokenData.max_usage) {
      return NextResponse.json(
        { error: 'Token usage limit exceeded' },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (tokenData.expires_at && new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      college: {
        id: tokenData.id,
        name: tokenData.college_name,
        type: tokenData.college_type,
        location: `${tokenData.city}, ${tokenData.state}, ${tokenData.country}`,
        usageCount: tokenData.usage_count,
        maxUsage: tokenData.max_usage
      }
    });

  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

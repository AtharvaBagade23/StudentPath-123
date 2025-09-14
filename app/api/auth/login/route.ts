import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, collegeToken } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // First validate the college token
    let collegeId = null;
    if (collegeToken) {
      const connection = await pool.getConnection();
      
      const [tokenResult] = await connection.execute(
        `SELECT c.id, c.college_name, ct.usage_count, ct.max_usage, ct.is_active 
         FROM colleges c 
         JOIN college_tokens ct ON c.id = ct.college_id 
         WHERE ct.token = ? AND ct.is_active = TRUE AND c.is_active = TRUE`,
        [collegeToken]
      );

      if (Array.isArray(tokenResult) && tokenResult.length === 0) {
        connection.release();
        return NextResponse.json(
          { error: 'Invalid or expired college token' },
          { status: 400 }
        );
      }

      const tokenData = (tokenResult as any[])[0];
      collegeId = tokenData.id;
      connection.release();
    }

    // Get student details
    const connection = await pool.getConnection();
    const [students] = await connection.execute(
      `SELECT student_id, first_name, last_name, email, password_hash, college_id 
       FROM Students 
       WHERE email = ? AND is_active = TRUE`,
      [email]
    );

    if (Array.isArray(students) && students.length === 0) {
      connection.release();
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const student = (students as any[])[0];

    // If college token provided, verify student belongs to that college
    if (collegeId && student.college_id !== collegeId) {
      connection.release();
      return NextResponse.json(
        { error: 'Student does not belong to this college' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, student.password_hash);
    if (!isPasswordValid) {
      connection.release();
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    connection.release();

    // Remove sensitive data before sending response
    const { password_hash, ...studentData } = student;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      student: studentData
    });

  } catch (error) {
    console.error('Student login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

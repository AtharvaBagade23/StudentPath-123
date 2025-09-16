import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const token = searchParams.get('token');

    if (!studentId || !token) {
      return NextResponse.json(
        { error: 'Student ID and token are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    // First validate the token
    const [tokenRows] = await connection.execute<RowDataPacket[]>(
      `SELECT c.id, c.college_name 
       FROM colleges c 
       JOIN college_tokens ct ON c.id = ct.college_id 
       WHERE ct.token = ? AND ct.is_active = TRUE
       LIMIT 1`,
      [token]
    );

    if (!tokenRows || tokenRows.length === 0) {
      connection.release();
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get student data
    const [studentRows] = await connection.execute<RowDataPacket[]>(
      `SELECT 
        s.student_id,
        s.first_name,
        s.last_name,
        s.email,
        s.phone,
        s.college,
        s.program,
        s.current_year,
        s.current_semester,
        s.current_gpa,
        s.academic_interests,
        s.career_quiz_answers,
        s.technical_skills,
        s.soft_skills,
        s.language_skills,
        s.primary_goal,
        s.secondary_goal,
        s.timeline,
        s.location_preference,
        s.industry_focus,
        c.college_name,
        c.college_type,
        c.city,
        c.state,
        c.country
       FROM students s
       JOIN colleges c ON s.college_id = c.id
       WHERE s.student_id = ? AND s.is_active = TRUE
       LIMIT 1`,
      [studentId]
    );

    connection.release();

    if (!studentRows || studentRows.length === 0) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    const student = studentRows[0] as any;

    // Parse JSON strings back to objects
    const studentData = {
      ...student,
      academic_interests: JSON.parse(student.academic_interests || '[]'),
      career_quiz_answers: JSON.parse(student.career_quiz_answers || '{}'),
      technical_skills: JSON.parse(student.technical_skills || '{}'),
      soft_skills: JSON.parse(student.soft_skills || '{}'),
      language_skills: JSON.parse(student.language_skills || '{}'),
      industry_focus: JSON.parse(student.industry_focus || '[]')
    };

    return NextResponse.json({
      success: true,
      student: studentData
    });
  } catch (error) {
    console.error('Error fetching student data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

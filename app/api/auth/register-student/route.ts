import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studentId,
      firstName,
      lastName,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      college,
      program,
      currentYear,
      currentSemester,
      enrollmentYear,
      currentGPA,
      academicInterests,
      careerQuizAnswers,
      technicalSkills,
      softSkills,
      languageSkills,
      primaryGoal,
      secondaryGoal,
      timeline,
      locationPreference,
      industryFocus,
      intensityLevel,
      collegeToken
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate college token if provided
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
      
      // Check if token usage limit exceeded
      if (tokenData.usage_count >= tokenData.max_usage) {
        connection.release();
        return NextResponse.json(
          { error: 'College token usage limit exceeded' },
          { status: 400 }
        );
      }

      collegeId = tokenData.id;

      // Update token usage count
      await connection.execute(
        'UPDATE college_tokens SET usage_count = usage_count + 1 WHERE token = ?',
        [collegeToken]
      );

      connection.release();
    }

    // Check if email already exists
    const connection = await pool.getConnection();
    
    const [existingStudent] = await connection.execute(
      'SELECT student_id FROM Students WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingStudent) && existingStudent.length > 0) {
      connection.release();
      return NextResponse.json(
        { error: 'Student with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert student data
    const [result] = await connection.execute(
      `INSERT INTO Students (
        first_name, last_name, name, email, phone, password_hash,
        date_of_birth, gender, college_id, college, program, current_year, current_semester,
        enrollment_year, current_gpa, academic_interests, career_quiz_answers,
        technical_skills, soft_skills, language_skills, primary_goal,
        secondary_goal, timeline, location_preference, industry_focus,
        intensity_level, created_at, updated_at, is_active
      ) VALUES (?, ?, CONCAT(?, ' ', ?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), TRUE)`,
      [
        firstName,
        lastName,
        firstName,  // For CONCAT to create full name
        lastName,   // For CONCAT to create full name
        email,
        phone || null,
        passwordHash,
        dateOfBirth || null,
        gender || null,
        collegeId,  // Foreign key reference to colleges table
        college || null,
        program || null,
        currentYear ? parseInt(currentYear) : null,
        currentSemester || null,
        enrollmentYear ? parseInt(enrollmentYear) : null,
        currentGPA || null,
        JSON.stringify(academicInterests || []),
        JSON.stringify(careerQuizAnswers || {}),
        JSON.stringify(technicalSkills || {}),
        JSON.stringify(softSkills || {}),
        JSON.stringify(languageSkills || {}),
        primaryGoal || null,
        secondaryGoal || null,
        timeline || null,
        locationPreference || null,
        JSON.stringify(industryFocus || []),
        intensityLevel || 'moderate'
      ]
    );

    const studentId_result = (result as any).insertId;

    connection.release();

    return NextResponse.json({
      success: true,
      message: 'Student registered successfully',
      studentId: studentId_result,
      collegeId
    });

  } catch (error) {
    console.error('Student registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

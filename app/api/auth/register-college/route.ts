import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      collegeName,
      email,
      phone,
      country,
      state,
      city,
      address,
      website,
      establishedYear,
      collegeType,
      accreditation,
      password,
      contactPerson,
      contactPersonEmail,
      contactPersonPhone,
      totalStudents,
      programs,
      collegeToken
    } = body;

    // Validate required fields
    if (!collegeName || !email || !password || !country || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const connection = await pool.getConnection();
    
    const [existingCollege] = await connection.execute(
      'SELECT id FROM colleges WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingCollege) && existingCollege.length > 0) {
      connection.release();
      return NextResponse.json(
        { error: 'College with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert college data
    const [result] = await connection.execute(
      `INSERT INTO colleges (
        college_name, email, phone, country, state, city, address, website,
        established_year, college_type, accreditation, password_hash, college_token,
        contact_person, contact_person_email, contact_person_phone, total_students, programs
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        collegeName,
        email,
        phone || null,
        country,
        state || null,
        city,
        address || null,
        website || null,
        establishedYear ? parseInt(establishedYear) : null,
        collegeType || null,
        accreditation || null,
        passwordHash,
        collegeToken,
        contactPerson || null,
        contactPersonEmail || null,
        contactPersonPhone || null,
        totalStudents ? parseInt(totalStudents) : null,
        JSON.stringify(programs || [])
      ]
    );

    const collegeId = (result as any).insertId;

    // Insert token record
    await connection.execute(
      `INSERT INTO college_tokens (college_id, token, max_usage) VALUES (?, ?, ?)`,
      [collegeId, collegeToken, 1000]
    );

    connection.release();

    return NextResponse.json({
      success: true,
      message: 'College registered successfully',
      collegeId,
      token: collegeToken
    });

  } catch (error) {
    console.error('College registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would get the college ID from the authenticated session
    // For now, we'll use a mock approach or get from query params
    const { searchParams } = new URL(request.url);
    const collegeId = searchParams.get('collegeId');

    if (!collegeId) {
      return NextResponse.json(
        { error: 'College ID is required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    // Get college basic info
    const [collegeResult] = await connection.execute(
      `SELECT id, college_name, college_token, total_students, programs, created_at 
       FROM colleges 
       WHERE id = ? AND is_active = TRUE`,
      [collegeId]
    );

    if (Array.isArray(collegeResult) && collegeResult.length === 0) {
      connection.release();
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      );
    }

    const college = collegeResult[0] as any;

    // Get student count
    const [studentCountResult] = await connection.execute(
      'SELECT COUNT(*) as total_students FROM students WHERE college_id = ? AND is_active = TRUE',
      [collegeId]
    );

    const totalStudents = (studentCountResult as any)[0].total_students;

    // Get recent registrations
    const [recentRegistrations] = await connection.execute(
      `SELECT first_name, last_name, program, created_at 
       FROM students 
       WHERE college_id = ? AND is_active = TRUE 
       ORDER BY created_at DESC 
       LIMIT 5`,
      [collegeId]
    );

    // Get token usage info
    const [tokenUsageResult] = await connection.execute(
      `SELECT usage_count, max_usage, is_active 
       FROM college_tokens 
       WHERE college_id = ?`,
      [collegeId]
    );

    const tokenUsage = tokenUsageResult[0] as any;

    connection.release();

    return NextResponse.json({
      college: {
        id: college.id,
        name: college.college_name,
        token: college.college_token,
        totalStudents: totalStudents,
        activeStudents: totalStudents, // Assuming all are active for now
        programs: JSON.parse(college.programs || '[]'),
        createdAt: college.created_at
      },
      recentRegistrations: (recentRegistrations as any[]).map(reg => ({
        name: `${reg.first_name} ${reg.last_name}`,
        program: reg.program,
        date: reg.created_at.split('T')[0] // Format date
      })),
      tokenUsage: {
        usageCount: tokenUsage.usage_count,
        maxUsage: tokenUsage.max_usage,
        remaining: tokenUsage.max_usage - tokenUsage.usage_count,
        isActive: tokenUsage.is_active
      }
    });

  } catch (error) {
    console.error('Error fetching college data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

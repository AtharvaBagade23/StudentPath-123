import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2"; // for type safety

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collegeId = searchParams.get("collegeId");

    if (!collegeId) {
      return NextResponse.json({ error: "College ID is required" }, { status: 400 });
    }

    const connection = await pool.getConnection();

    // 1. Get college basic info
    const [collegeRows] = await connection.execute<RowDataPacket[]>(
      `SELECT id, college_name, college_token, total_students, programs, created_at 
       FROM colleges 
       WHERE id = ? AND is_active = TRUE`,
      [collegeId]
    );

    if (collegeRows.length === 0) {
      connection.release();
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    const college = collegeRows[0];

    // 2. Get student count
    const [studentCountRows] = await connection.execute<RowDataPacket[]>(
      `SELECT COUNT(*) as total_students 
       FROM students 
       WHERE college_id = ? AND is_active = TRUE`,
      [collegeId]
    );

    const totalStudents = studentCountRows[0]?.total_students ?? 0;

    // 3. Get recent registrations
    const [recentRegistrationRows] = await connection.execute<RowDataPacket[]>(
      `SELECT first_name, last_name, program, created_at 
       FROM students 
       WHERE college_id = ? AND is_active = TRUE 
       ORDER BY created_at DESC 
       LIMIT 5`,
      [collegeId]
    );

    // 4. Get token usage info
    const [tokenUsageRows] = await connection.execute<RowDataPacket[]>(
      `SELECT usage_count, max_usage, is_active 
       FROM college_tokens 
       WHERE college_id = ?`,
      [collegeId]
    );

    const tokenUsage = tokenUsageRows[0] || { usage_count: 0, max_usage: 0, is_active: false };

    connection.release();

    return NextResponse.json({
      college: {
        id: college.id,
        name: college.college_name,
        token: college.college_token,
        totalStudents,
        activeStudents: totalStudents, // Assuming all are active
        programs: JSON.parse(college.programs || "[]"),
        createdAt: college.created_at,
      },
      recentRegistrations: recentRegistrationRows.map((reg) => ({
        name: `${reg.first_name} ${reg.last_name}`,
        program: reg.program,
        date: String(reg.created_at).split("T")[0], // format date
      })),
      tokenUsage: {
        usageCount: tokenUsage.usage_count,
        maxUsage: tokenUsage.max_usage,
        remaining: tokenUsage.max_usage - tokenUsage.usage_count,
        isActive: tokenUsage.is_active,
      },
    });
  } catch (error) {
    console.error("Error fetching college data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

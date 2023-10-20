import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1)
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();

  // Validate the body
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Create the new issue
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description }
  });

  // Return the new issue
  return NextResponse.json(newIssue);
}
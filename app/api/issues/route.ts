import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../ValidationSchemas";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();

  // Validate the body
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Create the new issue
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description }
  });

  // Return the new issue
  return NextResponse.json(newIssue);
}
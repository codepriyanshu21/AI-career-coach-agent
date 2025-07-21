import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { HistoryTable } from "../../../configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { content, recordId, aiAgentType } = await req.json();
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.insert(HistoryTable).values({
      recordId,
      content,
      userEmail: user.primaryEmailAddress.emailAddress,
      createdAt: new Date().toISOString(), // better ISO format
      aiAgentType,
    });

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { content, recordId } = await req.json();

    const result = await db
      .update(HistoryTable)
      .set({ content })
      .where(eq(HistoryTable.recordId, recordId));

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url, "http://localhost"); // fix: base required for URL
    const recordId = searchParams.get("recordId");
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (recordId) {
      const result = await db
        .select()
        .from(HistoryTable)
        .where(eq(HistoryTable.recordId, recordId));
      return NextResponse.json(result[0] || {});
    } else {
      const result = await db
        .select()
        .from(HistoryTable)
        .where(
          eq(HistoryTable.userEmail, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(HistoryTable.id));
      return NextResponse.json(result);
    }
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

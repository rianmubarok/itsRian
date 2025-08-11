import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const supabase = createClient(supabaseUrl, serviceRoleKey);

type GuestbookMessagePart = { type: "text" | "user"; value: string };

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("guestbook")
      .select("id, name, message, date, profile_pic, email, is_author")
      .order("date", { ascending: true });
    if (error) throw error;

    const items = (data ?? []).map((row: any) => ({
      id: row.id,
      name: row.name,
      message: row.message as GuestbookMessagePart[],
      date: row.date,
      profilePic: row.profile_pic,
      email: row.email ?? undefined,
      isAuthor: row.is_author ?? false,
    }));

    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/guestbook error", err);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, message, date, profilePic, email, isAuthor } = body as {
      name: string;
      message: GuestbookMessagePart[];
      date: string;
      profilePic: string;
      email?: string;
      isAuthor?: boolean;
    };

    const { data, error } = await supabase
      .from("guestbook")
      .insert({
        name,
        message,
        date,
        profile_pic: profilePic,
        email: email ?? null,
        is_author: isAuthor ?? false,
      })
      .select("id, name, message, date, profile_pic, email, is_author")
      .single();
    if (error) throw error;

    const inserted = {
      id: data.id as string,
      name: data.name as string,
      message: (data.message ?? []) as GuestbookMessagePart[],
      date: data.date as string,
      profilePic: data.profile_pic as string,
      email: (data.email ?? undefined) as string | undefined,
      isAuthor: (data.is_author ?? false) as boolean,
    };

    return NextResponse.json(inserted, { status: 201 });
  } catch (err) {
    console.error("POST /api/guestbook error", err);
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 }
    );
  }
}

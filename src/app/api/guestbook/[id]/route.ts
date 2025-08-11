import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, serviceRoleKey);

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { error } = await supabase
      .from("guestbook")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/guestbook/[id] error", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

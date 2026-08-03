import { getItems, isResourceName } from "@/lib/content"
import { NextResponse } from "next/server"

const publicResources = new Set(["services", "blogs", "navItems", "clinics", "socialLinks", "about", "contact"])

export async function GET(_: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource } = await context.params
  if (!isResourceName(resource) || !publicResources.has(resource)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  const items = await getItems(resource)
  return NextResponse.json(items, { headers: { "Cache-Control": "no-store" } })
}

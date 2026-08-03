import { auth } from "@/auth"
import { getDb } from "@/lib/mongodb"
import { isResourceName, resources } from "@/lib/content"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"
import { parseServiceArray, serviceJsonFields } from "@/lib/models/service"

function cleanInput(resource: string, fields: Record<string, string>, body: Record<string, unknown>) {
  return Object.fromEntries(Object.keys(fields).map(key => {
    if (resource === "services" && serviceJsonFields.has(key)) return [key, parseServiceArray(body[key])]
    return [key, key === "order" ? Number(body[key] || 0) : String(body[key] ?? "").trim()]
  }))
}

async function allowed(resource: string) {
  const session = await auth()
  return session?.user?.role === "admin" && isResourceName(resource)
}

export async function GET(_: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource } = await context.params
  if (!(await allowed(resource))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const db = await getDb()
  const items = await db.collection(resource).find({}).sort({ order: 1, updatedAt: -1 }).toArray()
  return NextResponse.json(items.map(({ _id, ...item }) => ({ id: _id.toString(), ...item })))
}

export async function POST(request: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource } = await context.params
  if (!(await allowed(resource))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await request.json()
  const definition = resources[resource as keyof typeof resources]
  const clean = cleanInput(resource, definition.fields, body)
  const db = await getDb()
  if ("singleton" in definition && definition.singleton) {
    const current = await db.collection(resource).findOne({})
    if (current) {
      await db.collection(resource).updateOne({ _id: current._id }, { $set: { ...clean, updatedAt: new Date() } })
      return NextResponse.json({ id: current._id.toString(), ...clean })
    }
  }
  const result = await db.collection(resource).insertOne({ ...clean, createdAt: new Date(), updatedAt: new Date() })
  return NextResponse.json({ id: result.insertedId.toString(), ...clean }, { status: 201 })
}

export async function PUT(request: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource } = await context.params
  if (!(await allowed(resource))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id, ...body } = await request.json()
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  const definition = resources[resource as keyof typeof resources]
  const clean = cleanInput(resource, definition.fields, body)
  await (await getDb()).collection(resource).updateOne({ _id: new ObjectId(id) }, { $set: { ...clean, updatedAt: new Date() } })
  return NextResponse.json({ id, ...clean })
}

export async function DELETE(request: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource } = await context.params
  if (!(await allowed(resource))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await request.json()
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  await (await getDb()).collection(resource).deleteOne({ _id: new ObjectId(id) })
  return NextResponse.json({ ok: true })
}

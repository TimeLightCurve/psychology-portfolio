import { auth } from '@/auth'
import { randomUUID } from 'crypto'
import { mkdir, readdir, writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

const publicDirectory = path.join(process.cwd(), 'public')
const uploadDirectory = path.join(publicDirectory, 'uploads')
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp'])
const maximumFileSize = 5 * 1024 * 1024

async function isAdmin() {
  const session = await auth()
  return session?.user?.role === 'admin'
}

async function findImages(directory: string, relativeDirectory = ''): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const images = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.join(relativeDirectory, entry.name)
      if (entry.isDirectory()) return findImages(path.join(directory, entry.name), relativePath)
      return imageExtensions.has(path.extname(entry.name).toLowerCase())
        ? [`/${relativePath.split(path.sep).join('/')}`]
        : []
    }),
  )
  return images.flat()
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json((await findImages(publicDirectory)).sort())
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const file = (await request.formData()).get('file')
  if (
    !(file instanceof File) ||
    !file.type.startsWith('image/') ||
    !imageExtensions.has(path.extname(file.name).toLowerCase())
  ) {
    return NextResponse.json({ error: 'Please select a supported image file.' }, { status: 400 })
  }
  if (file.size > maximumFileSize)
    return NextResponse.json({ error: 'Image must be 5 MB or smaller.' }, { status: 400 })

  await mkdir(uploadDirectory, { recursive: true })
  const extension = path.extname(file.name).toLowerCase()
  const filename = `${randomUUID()}${extension}`
  await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()))
  return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 })
}

import ResourceManager from "@/components/admin/ResourceManager"
import { isResourceName, resources } from "@/lib/content"
import { notFound } from "next/navigation"

export default async function ResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params
  if (!isResourceName(resource)) notFound()
  const definition = resources[resource]
  return <ResourceManager resource={resource} definition={{ label: definition.label, singleton: "singleton" in definition ? definition.singleton : false, fields: definition.fields }} />
}

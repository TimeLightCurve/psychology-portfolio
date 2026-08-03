import { getItems } from "@/lib/content"
import ServiceDetail from "@/components/services/ServiceDetail"
import type { ServiceDocument } from "@/lib/models/service"
import { notFound } from "next/navigation"

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = (await getItems<ServiceDocument>("services")).find(item => item.slug === slug)
  if (!service) notFound()
  return <ServiceDetail service={service} />
}

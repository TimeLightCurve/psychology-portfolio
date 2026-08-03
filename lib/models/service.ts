export type ServiceAccordionItem = {
  title: string
  content: string
}

export type ServiceDocument = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  order: number
  supportTitle: string
  supportIntro: string
  supportItems: ServiceAccordionItem[]
  infoTitle: string
  infoContent: string
  treatmentsTitle: string
  treatments: ServiceAccordionItem[]
  ctaTitle: string
  ctaContent: string
  ctaLabel: string
  ctaHref: string
}

export const serviceJsonFields = new Set(["supportItems", "treatments"])

export function parseServiceArray(value: unknown): ServiceAccordionItem[] {
  if (Array.isArray(value)) {
    return value
      .filter(item => item && typeof item === "object")
      .map(item => ({
        title: String((item as Record<string, unknown>).title ?? "").trim(),
        content: String((item as Record<string, unknown>).content ?? "").trim(),
      }))
      .filter(item => item.title)
  }
  if (typeof value !== "string" || !value.trim()) return []
  try { return parseServiceArray(JSON.parse(value)) } catch { return [] }
}

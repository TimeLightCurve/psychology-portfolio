"use client"

import { useEffect, useState } from "react"

type PublicResource = "services" | "blogs" | "navItems" | "clinics" | "socialLinks" | "about" | "contact"

export function usePublicContent<T>(resource: PublicResource) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/content/${resource}`, { signal: controller.signal, cache: "no-store" })
      .then(response => response.ok ? response.json() as Promise<T[]> : Promise.reject())
      .then(setItems)
      .catch(() => undefined)
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [resource])

  return { items, loading }
}

export function usePublicSingleton<T>(resource: "about" | "contact") {
  const result = usePublicContent<T>(resource)
  return { item: result.items[0] ?? null, loading: result.loading }
}

import { getItems } from '@/lib/content'
import type { BlogDocument } from '@/lib/models/blog'
import type { ServiceDocument } from '@/lib/models/service'
import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.shaghayeghzarei.ir'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, blogs] = await Promise.all([
    getItems<ServiceDocument>('services'),
    getItems<BlogDocument>('blogs'),
  ])

  const staticPages = ['', '/about', '/blog', '/contact'].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }))

  const servicePages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
  }))

  const blogPages = blogs.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}

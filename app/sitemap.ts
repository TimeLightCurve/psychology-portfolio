import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.shaghayeghzarei.ir'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/about', '/blog', '/contact', '/services'].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }))
}

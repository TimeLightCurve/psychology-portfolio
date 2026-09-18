import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login/', '/api/', '/test/'],
    },
    sitemap: 'https://www.shaghayeghzarei.ir/sitemap.xml',
  }
}

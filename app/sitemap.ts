import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://rentme.cg',
      lastModified: new Date(),
      priority: 1,
    },
  ]
}

import { getDb, isMongoConfigured } from "@/lib/mongodb"

export const resources = {
  services: {
    label: "خدمات",
    fields: {
      title: "عنوان", slug: "نامک", excerpt: "متن معرفی هیرو", content: "متن اصلی", image: "آدرس تصویر هیرو", order: "ترتیب",
      supportTitle: "عنوان بخش حمایت شخصی", supportIntro: "معرفی بخش حمایت شخصی",
      supportItems: "موارد حمایت (JSON: title و content)", infoTitle: "عنوان بخش میانی", infoContent: "متن بخش میانی",
      treatmentsTitle: "عنوان درمان‌های رایج", treatments: "درمان‌ها (JSON: title و content)",
      ctaTitle: "عنوان دعوت به اقدام", ctaContent: "متن دعوت به اقدام", ctaLabel: "متن دکمه", ctaHref: "پیوند دکمه",
    },
  },
  blogs: {
    label: "مقالات",
    fields: {
      title: "عنوان", slug: "نامک", excerpt: "خلاصه", content: "متن مقاله", image: "تصویر اصلی",
      category: "دسته‌بندی", authorName: "نام نویسنده", authorRole: "سمت نویسنده", authorImage: "تصویر نویسنده",
      publishedAt: "تاریخ انتشار", order: "ترتیب",
    },
  },
  navItems: {
    label: "منوی سایت",
    fields: { label: "عنوان", href: "پیوند", kind: "نوع (link یا services)", order: "ترتیب" },
  },
  clinics: {
    label: "کلینیک‌ها",
    fields: { title: "نام", address: "آدرس", phone: "تلفن", email: "ایمیل", image: "آدرس تصویر", mapUrl: "لینک نقشه", order: "ترتیب" },
  },
  socialLinks: {
    label: "شبکه‌های اجتماعی",
    fields: { label: "نام", url: "پیوند", order: "ترتیب" },
  },
  about: {
    label: "درباره ما",
    singleton: true,
    fields: { title: "عنوان", subtitle: "زیرعنوان", content: "متن صفحه درباره", image: "آدرس تصویر", highlightTitle: "عنوان درباره در صفحه اصلی", highlightContent: "متن درباره در صفحه اصلی" },
  },
  contact: {
    label: "تماس با ما",
    singleton: true,
    fields: { title: "عنوان", intro: "توضیحات", email: "ایمیل", phone: "تلفن", fax: "فکس", formTitle: "عنوان فرم", formIntro: "توضیحات فرم", locationsTitle: "عنوان فهرست کلینیک‌ها" },
  },
} as const

export type ResourceName = keyof typeof resources

export function isResourceName(value: string): value is ResourceName {
  return value in resources
}

export async function getItems<T extends Record<string, unknown>>(name: ResourceName): Promise<T[]> {
  if (!isMongoConfigured()) return []
  try {
    const db = await getDb()
    const items = await db.collection(name).find({}).sort({ order: 1, updatedAt: -1 }).toArray()
    return items.map(({ _id, ...item }) => ({ id: _id.toString(), ...item } as unknown as T))
  } catch {
    return []
  }
}

export async function getSingleton<T extends Record<string, unknown>>(name: "about" | "contact") {
  const items = await getItems<T>(name)
  return items[0] ?? null
}

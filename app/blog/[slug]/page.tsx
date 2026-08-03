import BlogCard from "@/components/blog/BlogCard"
import type { BlogDocument } from "@/lib/models/blog"
import { getItems } from "@/lib/content"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = await getItems<BlogDocument>("blogs")
  const post = posts.find(item => item.slug === slug)
  if (!post) notFound()
  const recommended = posts.filter(item => item.id !== post.id && (item.category === post.category || posts.indexOf(item) < 4)).slice(0, 3)

  return <main className="min-h-screen bg-[#f8f5ed] px-4 pb-24 pt-32 font-nian text-[#31534c] sm:px-6 lg:px-24 lg:pt-40">
    <article className="mx-auto max-w-[1720px]">
      <Link href="/blog" className="inline-flex items-center gap-3 rounded-full border border-[#55736b] px-5 py-2.5 text-sm">→ بازگشت به همه مقالات</Link>
      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
        <div><p className="text-sm text-[#71857e]">{post.category}</p><h1 className="mt-4 max-w-6xl text-[clamp(3.8rem,8vw,8rem)] font-light leading-[.95] tracking-[-.055em]">{post.title}</h1></div>
        <div className="flex items-center gap-4 pb-3"><Image src={post.authorImage || "/about-me.jpg"} alt={post.authorName} width={64} height={64} className="h-16 w-16 rounded-full object-cover" /><div><p className="text-sm text-[#7a8d86]">نوشته شده توسط</p><p className="mt-1">{post.authorName}</p></div></div>
      </div>
      <div className="relative mt-16 aspect-[16/8] overflow-hidden rounded-[2.5rem] bg-[#dcebe5]"><Image src={post.image} alt={post.title} fill priority className="object-cover" /></div>
      <div className="mx-auto max-w-4xl py-16"><p className="text-sm text-[#71857e]">{post.publishedAt}</p><p className="mt-8 whitespace-pre-line text-xl leading-10 sm:text-2xl sm:leading-[2.15]">{post.content}</p><div className="mt-16 flex items-center gap-4 border-t border-[#9aaba5] pt-8"><Image src={post.authorImage || "/about-me.jpg"} alt={post.authorName} width={72} height={72} className="h-18 w-18 rounded-full object-cover" /><div><p className="text-2xl font-light">{post.authorName}</p><p className="mt-1 text-[#71857e]">{post.authorRole}</p></div></div></div>
    </article>
    {recommended.length > 0 && <section className="mx-auto mt-12 max-w-[1720px] border-t border-[#789088] pt-14"><div className="flex items-end justify-between gap-4"><h2 className="text-[clamp(3rem,6vw,6rem)] font-light tracking-[-.05em]">مقالات پیشنهادی</h2><Link href="/blog" className="rounded-full bg-[#cceee2] px-5 py-3">مشاهده همه ←</Link></div><div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">{recommended.map(item => <BlogCard key={item.id} post={item} />)}</div></section>}
  </main>
}

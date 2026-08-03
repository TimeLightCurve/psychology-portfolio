"use client"

import type { BlogDocument } from "@/lib/models/blog"
import { usePublicContent } from "@/lib/use-public-content"
import { useMemo, useState } from "react"
import BlogCard from "./BlogCard"

export default function BlogIndex() {
  const { items: posts, loading } = usePublicContent<BlogDocument>("blogs")
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fa")
    if (!needle) return posts
    return posts.filter(post => [post.title, post.excerpt, post.category, post.authorName].some(value => value?.toLocaleLowerCase("fa").includes(needle)))
  }, [posts, query])

  return <main className="min-h-screen bg-[#f8f5ed] px-4 pb-24 pt-36 font-nian text-[#31534c] sm:px-6 lg:px-24 lg:pt-44">
    <div className="mx-auto max-w-[1720px]">
      <div className="grid items-end gap-10 border-b border-[#81958f] pb-12 lg:grid-cols-[1fr_520px]">
        <div><p className="text-sm tracking-[.24em] text-[#7b8f88]">مجله سلامت روان</p><h1 className="mt-4 text-[clamp(4.5rem,9vw,9rem)] font-light leading-none tracking-[-.06em]">مقالات</h1></div>
        <label className="block"><span className="mb-3 block text-sm text-[#667c75]">جستجو در مقالات</span><div className="flex items-center rounded-full border border-[#789088] bg-white/50 px-5"><input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="عنوان، موضوع یا نویسنده…" className="w-full bg-transparent py-4 outline-none placeholder:text-[#9aa9a4]" /><span aria-hidden="true" className="text-xl">⌕</span></div></label>
      </div>
      {loading ? <div className="grid gap-8 py-16 md:grid-cols-2 xl:grid-cols-3">{[1,2,3].map(item => <div key={item} className="aspect-[1.1] animate-pulse rounded-[2rem] bg-[#e4ece8]" />)}</div> : filtered.length ? <div className="grid gap-x-8 gap-y-16 py-16 md:grid-cols-2 xl:grid-cols-3">{filtered.map(post => <BlogCard key={post.id} post={post} />)}</div> : <p className="py-24 text-center text-xl text-[#71857e]">مقاله‌ای با این عبارت پیدا نشد.</p>}
    </div>
  </main>
}

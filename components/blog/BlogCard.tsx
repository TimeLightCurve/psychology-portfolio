import type { BlogDocument } from "@/lib/models/blog"
import Image from "next/image"
import Link from "next/link"

export default function BlogCard({ post }: { post: BlogDocument }) {
  return <article className="group">
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="relative aspect-[1.35] overflow-hidden rounded-[2rem] bg-[#dcebe5]">
        <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.035]" />
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 text-sm text-[#7a8d86]"><span>{post.category}</span><time>{post.publishedAt}</time></div>
      <h2 className="mt-3 text-3xl font-light leading-tight tracking-[-.035em] text-[#31534c] sm:text-4xl">{post.title}</h2>
      <p className="mt-3 line-clamp-2 text-base leading-8 text-[#60766f]">{post.excerpt}</p>
    </Link>
  </article>
}

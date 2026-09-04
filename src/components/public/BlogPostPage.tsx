import React from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { useReadingProgress } from '../shared/ReadingProgressBar';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Share2,
  Bookmark,
  ChevronRight
} from 'lucide-react';

export const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { getBlogPostBySlug, getBlogPosts } = useDatabase();
  const readingProgress = useReadingProgress();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-slate-500 mt-2">The requested engineering publication could not be found.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#0282EB] mt-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to All Publications
        </Link>
      </div>
    );
  }

  const allPosts = getBlogPosts();
  const otherPosts = allPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2 truncate pr-4">
            <Link href="/blog" className="hover:text-[#0282EB] flex items-center gap-1 shrink-0">
              <ArrowLeft className="w-3.5 h-3.5" /> Blog
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate">{post.title}</span>
          </div>
          {/* Subtle Live Reading Progress Indicator */}
          <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <span>Reading</span>
            <span className="font-semibold text-[#0282EB] bg-blue-50 px-2 py-0.5 rounded-sm">
              {Math.round(readingProgress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0282EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author Profile */}
          <div className="flex items-center justify-between py-6 border-y border-slate-200">
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-bold text-slate-900 text-sm">{post.author.name}</div>
                <div className="text-xs text-slate-500">{post.author.role}</div>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Published on {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 my-8 max-h-[480px]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-base whitespace-pre-line font-normal">
              {post.content}
            </div>

            {/* Tags */}
            <div className="pt-8 mt-10 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tags:
              </span>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="bg-blue-50/60 rounded-3xl p-8 border border-blue-200 flex items-start gap-5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-14 h-14 rounded-full object-cover border border-white shadow-sm shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-base">Written by {post.author.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senior systems researcher at The Beezent, publishing architectural deep-dives on deterministic LLM orchestration, evaluation guardrails, and enterprise agent runtime stability.
              </p>
            </div>
          </div>

          {/* Related Articles */}
          {otherPosts.length > 0 && (
            <div className="pt-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6">More Engineering Insights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherPosts.map(op => (
                  <Link
                    key={op.id}
                    href={`/blog/${op.slug}`}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <span className="text-[10px] font-bold uppercase text-[#0282EB] bg-blue-50 px-2 py-0.5 rounded-sm">
                      {op.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-3 mb-2 group-hover:text-[#0282EB] transition-colors line-clamp-2">
                      {op.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{op.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};
export default BlogPostPage;

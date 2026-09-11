import React from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { useReadingProgress } from '../shared/ReadingProgressBar';
import { SafeImage } from '../shared/SafeImage';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

const formatDate = (date: string | undefined) => {
  if (!date) return 'Recently';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return 'Recently';
  return parsed.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
};

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
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const avatar = post.author?.avatar || '';

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2 truncate min-w-0 pr-4">
            <Link href="/blog" className="hover:text-[#0282EB] flex items-center gap-1 shrink-0">
              <ArrowLeft className="w-3.5 h-3.5" /> Blog
            </Link>
            <span className="shrink-0">/</span>
            <span className="text-slate-900 font-semibold truncate">{post.title}</span>
          </div>
          {/* Subtle Live Reading Progress Indicator */}
          <div className="shrink-0 hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
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
          <div className="flex flex-wrap items-center gap-3">
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
          <div className="flex flex-col gap-4 py-6 border-y border-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {avatar ? (
                <SafeImage
                  src={avatar}
                  alt={post.author?.name || 'Author'}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0282EB] text-sm font-bold flex items-center justify-center shrink-0">
                  {(post.author?.name || 'B').charAt(0)}
                </div>
              )}
              <div>
                <div className="font-bold text-slate-900 text-sm">{post.author?.name}</div>
                <div className="text-xs text-slate-500">{post.author?.role}</div>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1.5 sm:justify-end">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published on {formatDate(post.publishedAt || post.publishDate)}</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 my-8 aspect-video max-h-[480px]">
            <SafeImage
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-xs">
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-relaxed prose-p:text-slate-700 prose-strong:text-slate-900 prose-a:text-[#0282EB] prose-li:text-slate-700 break-words">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="pt-8 mt-10 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Tags:
                </span>
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Author Bio Box */}
          <div className="bg-blue-50/60 rounded-3xl p-8 border border-blue-200 flex items-start gap-5">
            {avatar ? (
              <SafeImage
                src={avatar}
                alt={post.author?.name || 'Author'}
                className="w-14 h-14 rounded-full object-cover border border-white shadow-sm shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-blue-100 text-[#0282EB] text-lg font-bold flex items-center justify-center shrink-0">
                {(post.author?.name || 'B').charAt(0)}
              </div>
            )}
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-base">Written by {post.author?.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senior systems researcher at BEEZENTS, publishing architectural deep-dives on deterministic LLM orchestration, evaluation guardrails, and enterprise agent runtime stability.
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
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0282EB] focus-visible:ring-offset-2"
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
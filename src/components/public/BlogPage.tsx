import React, { useState } from 'react';
import { Link } from '../../context/RouterContext';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowRight, Clock, Tag, Calendar, Sparkles } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { getBlogPosts } = useDatabase();
  const posts = getBlogPosts();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = selectedCategory === 'ALL'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0282EB] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              SYSTEMS & AI RESEARCH
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Engineering Insights & Architecture
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Technical analyses, multi-agent orchestrator design patterns, evaluation frameworks, and lessons learned building production AI systems.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0282EB] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat === 'ALL' ? 'All Publications' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#0282EB] transition-colors leading-tight">
                    {post.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{post.author.name}</div>
                      <div className="text-[11px] text-slate-500">{post.author.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-7 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0282EB] hover:underline"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default BlogPage;

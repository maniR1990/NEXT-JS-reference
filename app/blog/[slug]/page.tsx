import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPosts } from '../../lib/data';

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Blog post not found' };

  return {
    title: `${post.title} · Workspace Analytics`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="page">
        <p className="muted">Post not found.</p>
      </div>
    );
  }

  const body = post.body
    .split('\n')
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className={paragraph.startsWith('##') ? 'muted strong' : undefined}>
        {paragraph.replace(/^#+\s*/, '')}
      </p>
    ));

  return (
    <div className="page">
      <Link href="/blog" className="muted">
        ← Back to blog
      </Link>
      <article className="card">
        <p className="eyebrow">{new Date(post.publishedAt).toLocaleDateString()}</p>
        <h1>{post.title}</h1>
        <p className="muted">By {post.author}</p>
        <div className="stack article-body">{body}</div>
      </article>
    </div>
  );
}

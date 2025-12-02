import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogPosts } from '../lib/data';

export const metadata: Metadata = {
  title: 'Blog · Workspace Analytics',
  description: 'Product updates and multi-tenant best practices.',
};

const PAGE_SIZE = 2;

export default function BlogIndex({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page ?? 1);
  const posts = getBlogPosts();
  const start = (page - 1) * PAGE_SIZE;
  const paginated = posts.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  return (
    <div className="page">
      <header className="section-heading">
        <p className="eyebrow">Blog</p>
        <h1>Workspace stories</h1>
        <p className="muted">Pagination handled via URL search params for cache-friendly navigation.</p>
      </header>
      <div className="stack">
        {paginated.map((post) => (
          <article key={post.slug} className="card">
            <p className="eyebrow">{new Date(post.publishedAt).toLocaleDateString()}</p>
            <h3>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="muted">{post.excerpt}</p>
            <p className="muted">By {post.author}</p>
          </article>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const href = pageNumber === 1 ? '/blog' : `/blog?page=${pageNumber}`;
          return (
            <Link key={pageNumber} href={href} className={pageNumber === page ? 'active' : ''}>
              {pageNumber}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

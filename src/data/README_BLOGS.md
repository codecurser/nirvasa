# Standard Blog Format Specification (One Image Per Blog)

All blog posts follow a strict, standardized data format with **exactly one primary image per blog post**.

---

## Standard Blog Post Schema

Each blog object in [`src/data/blogsData.ts`](file:///c:/Users/aryan/nirvasa/src/data/blogsData.ts) **MUST** follow this exact format:

```typescript
{
  id: 'blog-unique-id',                 // e.g. 'blog-1'
  slug: 'descriptive-url-slug',         // e.g. 'plan-luxury-event-personal'
  title: 'Blog Title',                  // Main headline
  subtitle: 'Catchy Subtitle',          // Article tagline
  excerpt: 'Short 2-3 line summary',    // Card preview text
  category: 'Luxury Planning',          // Category: 'Luxury Planning' | 'Corporate' | 'Destination Celebrations' | 'Styling & Design'
  author: {
    name: 'Author Name',
    role: 'Role / Designation',
    avatar: 'https://...'                // Author portrait URL
  },
  date: 'August 25, 2026',              // Formatted date string
  readTime: '5 min read',               // Estimated reading time
  image: 'https://...',                 // ★ EXACTLY ONE MAIN IMAGE PER BLOG ★
  tags: ['Tag1', 'Tag2'],               // Topic tags
  content: [                            // Text content array (paragraphs, headings, quotes, highlights)
    {
      type: 'paragraph',
      text: 'Body text paragraph...'
    },
    {
      type: 'heading',
      text: 'Section Subheading'
    },
    {
      type: 'quote',
      text: 'Featured quote text...'
    },
    {
      type: 'highlight',
      text: 'Key takeaway accent box...'
    }
  ]
}
```

---

## Rules for Adding / Updating Blogs:

1. **One Image Rule**: Each blog has **exactly one main image** passed via the `image` field. No extra body images are inserted inside `content`.
2. **Text Content**: Paragraphs, headings, quotes, and key takeaway highlight boxes are placed inside the `content` array.
3. **Categories**: Choose one of the 4 defined categories:
   - `Luxury Planning`
   - `Corporate`
   - `Destination Celebrations`
   - `Styling & Design`

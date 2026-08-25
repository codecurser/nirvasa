export interface BlogParagraph {
  type: 'heading' | 'paragraph' | 'quote' | 'highlight'
  text: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  subtitle: string
  excerpt: string
  category: 'Luxury Planning' | 'Corporate' | 'Destination Celebrations' | 'Styling & Design'
  author?: string
  date: string
  readTime: string
  image: string // Exactly ONE primary image per blog post
  tags: string[]
  content: BlogParagraph[]
}

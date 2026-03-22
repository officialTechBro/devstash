// Mock data for dashboard UI — replace with real DB data once Prisma is set up

export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "demo@devstash.io",
  isPro: false,
};

export const mockItemTypes = [
  { id: "type_snippet", name: "Snippet", icon: "code-2", color: "#3b82f6", isSystem: true, count: 24 },
  { id: "type_prompt", name: "Prompt", icon: "sparkles", color: "#a855f7", isSystem: true, count: 18 },
  { id: "type_command", name: "Command", icon: "terminal", color: "#f59e0b", isSystem: true, count: 15 },
  { id: "type_note", name: "Note", icon: "file-text", color: "#22c55e", isSystem: true, count: 12 },
  { id: "type_file", name: "File", icon: "file", color: "#64748b", isSystem: true, count: 5 },
  { id: "type_image", name: "Image", icon: "image", color: "#ec4899", isSystem: true, count: 3 },
  { id: "type_url", name: "URL", icon: "link", color: "#06b6d4", isSystem: true, count: 8 },
];

export const mockCollections = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    icons: ["code-2", "file-text", "link"],
  },
  {
    id: "col_python",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 5,
    icons: ["code-2", "file"],
  },
  {
    id: "col_context",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    icons: ["sparkles", "file"],
  },
  {
    id: "col_interview",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    icons: ["code-2", "link", "file-text"],
  },
  {
    id: "col_git",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    icons: ["terminal", "file"],
  },
  {
    id: "col_ai",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    icons: ["sparkles", "code-2"],
  },
];

export const mockItems = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: `import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}`,
    language: "typescript",
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_react",
    collectionName: "React Patterns",
    tags: ["react", "auth", "hooks"],
    isFavorite: true,
    isPinned: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: `async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(res.statusText)
      return res
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 2 ** i * 1000))
    }
  }
  throw new Error('Max retries reached')
}`,
    language: "typescript",
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_react",
    collectionName: "React Patterns",
    tags: ["api", "error-handling", "fetch"],
    isFavorite: false,
    isPinned: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "item_3",
    title: "ChatGPT Code Review Prompt",
    description: "Prompt for getting thorough code reviews from AI",
    contentType: "text",
    content: "Review the following code for: 1) bugs and edge cases, 2) performance issues, 3) security vulnerabilities, 4) readability improvements. Be concise and prioritize critical issues.",
    language: null,
    typeId: "type_prompt",
    typeName: "Prompt",
    collectionId: "col_ai",
    collectionName: "AI Prompts",
    tags: ["ai", "code-review", "chatgpt"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "item_4",
    title: "Git Interactive Rebase",
    description: "Squash last N commits into one",
    contentType: "text",
    content: "git rebase -i HEAD~N",
    language: "bash",
    typeId: "type_command",
    typeName: "Command",
    collectionId: "col_git",
    collectionName: "Git Commands",
    tags: ["git", "rebase"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "item_5",
    title: "Project Architecture Notes",
    description: "High-level notes on the current system design",
    contentType: "text",
    content: "## Architecture\n\nThe app follows a monorepo structure with Next.js App Router...",
    language: null,
    typeId: "type_note",
    typeName: "Note",
    collectionId: null,
    collectionName: null,
    tags: ["architecture", "docs"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "item_6",
    title: "Python List Comprehension Patterns",
    description: "Common list comprehension patterns in Python",
    contentType: "text",
    content: `# Filter and transform
evens_squared = [x**2 for x in range(10) if x % 2 == 0]

# Nested
matrix = [[i * j for j in range(5)] for i in range(5)]

# Dict comprehension
word_lengths = {word: len(word) for word in ['hello', 'world']}`,
    language: "python",
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_python",
    collectionName: "Python Snippets",
    tags: ["python", "list-comprehension"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
  },
];

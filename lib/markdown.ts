import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { Article } from '@/types'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getArticleData(filename: string): Promise<Article> {
    const fullPath = path.join(contentDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)
    const processedContent = await remark()
        .use(html)
        .use(remarkGfm)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id: filename.replace(/\.md$/, ''),
        title: matterResult.data.title,
        excerpt: matterResult.data.excerpt,
        contentHtml,
    }
}

export async function getAllArticles(): Promise<Article[]> {
    const filenames = fs.readdirSync(contentDirectory)
    return await Promise.all(
        filenames.map(async (filename) => {
            return await getArticleData(filename)
        })
    )
}

import ArticleCard from '../components/ArticleCard'
import { getAllArticles } from '@/lib/markdown'
import { Article } from "@/types";

export default async function Home() {
    const articles: Article[] = await getAllArticles()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="grid gap-4 lg:grid-cols-2 lg:w-full lg:max-w-5xl">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </main>
    )
}

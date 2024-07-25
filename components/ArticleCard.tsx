import Link from 'next/link'
import { Article } from '@/types'

const ArticleCard = ({ article }: { article: Article }) => {
    return (
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">
                {article.title} <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
                {article.excerpt}
            </p>
            <Link href={`/articles/${article.id}`}>
                <span className="text-blue-500">Read more</span>
            </Link>
        </div>
    )
}

export default ArticleCard

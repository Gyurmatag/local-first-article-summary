import { getArticleData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Article } from '@/types';
import AISummary from "@/components/AISummary";

const ArticleDetail = async ({ params }: { params: { id: string } }) => {
    const article: Article = await getArticleData(`${params.id}.md`);

    if (!article) {
        return notFound();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="max-w-none w-full lg:max-w-3xl">
                <div className="prose prose-lg" dangerouslySetInnerHTML={{__html: article.contentHtml}}/>
                <AISummary articleContent={article.contentHtml}/>
            </div>
        </main>
    );
}

export default ArticleDetail;

'use client'

import { streamText } from "ai";
import { chromeai } from "chrome-ai";
import { SparklesIcon } from "@heroicons/react/16/solid";
import { FormEvent, useState } from "react";

interface AISummaryProps {
    articleContent: string;
}

const AISummary = ({ articleContent }: AISummaryProps) => {
    const [hashtags, setHashtags] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let accumulatedHashtags = "";
        setLoading(true);
        try {
            const { textStream } = await streamText({
                model: chromeai("text", {}),
                prompt: `This is the content of an article: ${articleContent} Summarize in three basic hashtag with emojis at the end of each hashtag! Please make sure you only write the hashtags and emojis down, nothing more!`,
            });
            for await (const textPart of textStream) {
                accumulatedHashtags += textPart;
                setHashtags(accumulatedHashtags);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <button type="submit"
                        className="mt-10 flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-600">
                    <SparklesIcon className="h-5 w-5 mr-2"/>
                    {loading ? "Generating hashtags..." : "Generate some hashtags!"}
                </button>
            </form>
            <p className="mt-4 text-gray-700 text-lg font-bold">
                {hashtags}
            </p>
        </>
    );
}

export default AISummary;

"use client"

import React, { useEffect } from 'react'
import InputForm from "./inputForm"
import { queryWithGenAi } from "@/lib/actions/rag.actions";
import MarkdownRenderer from "./MarkdownRenderer";

const ChatBox = () => {

    const [responses, setResponses] = React.useState<any[]>([]);

    const handleSubmit = async ({ query }: { query: string }) => {
        const response = await queryWithGenAi({
            query
        })
        setResponses([...responses, response])
    }

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [responses])

    return (
        <div className="my-container relative w-full h-full">
            <div className="max-w-2xl mx-auto px-4 pb-32">
                {responses.map((response, index) => (
                    <div key={index} className="my-6">
                        {/* <p className="prose">{response}</p> */}
                        <MarkdownRenderer markdown={response} />
                    </div>
                ))}
            </div>
            <InputForm handleSubmit={handleSubmit} />
        </div>
    )
}

export default ChatBox
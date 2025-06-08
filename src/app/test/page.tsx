import { queryWithGenAi } from "@/lib/actions/rag.actions"
import React from 'react'
import ChatBox from "./components/ChatBox"

const Test = async () => {
    // const [responses, setResponses] = React.useState<string[]>([]);

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     const response = await queryWithGenAi({
    //         query: "Explain how AI works in a few words"
    //     })
    //     setResponses([...responses, response])
    // }

    return (
        <div className="h-full w-full">
            {/* <p>{response}</p> */}
            <ChatBox />
        </div>
    )
}

export default Test
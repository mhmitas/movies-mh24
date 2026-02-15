import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendIcon } from "lucide-react"
import React from 'react'

type InputFormParams = {
    handleSubmit: ({ query }: { query: string }) => void | Promise<void>
}

const InputForm = ({ handleSubmit }: InputFormParams) => {
    const [text, setText] = React.useState("")
    const promptRef = React.useRef<HTMLTextAreaElement>(null)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (promptRef.current) {
            handleSubmit({ query: promptRef.current.value })
        }
        setText("")
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="max-w-2xl mx-auto rounded-lg fixed bottom-12 inset-x-0">
                <AutoResizeTextarea
                    value={text}
                    ref={promptRef}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your prompt here"
                    className="px-6 pt-4 pb-8 !text-base border rounded-2xl resize-none"
                    autoFocus
                />
                <Button type="submit" size={"sm"} className="absolute bottom-2 right-2 rounded-xl"><SendIcon /></Button>
            </form>
        </div>
    )
}

export default InputForm
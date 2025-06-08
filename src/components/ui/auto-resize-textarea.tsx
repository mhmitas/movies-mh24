"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useAutoResizeTextarea } from "@/lib/hooks/use-auto-resize-textarea"

export interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    minHeight?: number
    maxHeight?: number
    enableSmoothing?: boolean
}

const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
    ({ className, value = "", minHeight = 50, maxHeight = 200, enableSmoothing = true, ...props }, ref) => {
        const { textareaRef } = useAutoResizeTextarea(String(value), {
            minHeight,
            maxHeight,
            padding: 0,
        })

        // Merge refs
        React.useImperativeHandle(ref, () => textareaRef.current!, [])

        return (
            <textarea
                ref={textareaRef}
                value={value}
                className={cn(
                    "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    enableSmoothing && "transition-[height] duration-150 ease-out",
                    className,
                )}
                style={{
                    resize: "none",
                    minHeight: `${minHeight}px`,
                    maxHeight: `${maxHeight}px`,
                }}
                {...props}
            />
        )
    },
)
AutoResizeTextarea.displayName = "AutoResizeTextarea"

export { AutoResizeTextarea }
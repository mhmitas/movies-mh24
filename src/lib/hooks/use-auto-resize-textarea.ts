"use client"

import { useEffect, useRef, useCallback } from "react"

interface UseAutoResizeTextareaOptions {
    minHeight?: number
    maxHeight?: number
    padding?: number
}

export function useAutoResizeTextarea(value: string, options: UseAutoResizeTextareaOptions = {}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { minHeight = 50, maxHeight = 200, padding = 16 } = options

    const resize = useCallback(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = "auto"

        // Calculate the new height
        const scrollHeight = textarea.scrollHeight
        const newHeight = Math.min(Math.max(scrollHeight + padding, minHeight), maxHeight)

        // Apply the new height with smooth transition
        textarea.style.height = `${newHeight}px`

        // Show scrollbar only if content exceeds maxHeight
        textarea.style.overflowY = scrollHeight + padding > maxHeight ? "auto" : "hidden"
    }, [minHeight, maxHeight, padding])

    // Resize when value changes
    useEffect(() => {
        resize()
    }, [value, resize])

    // Resize on mount and when textarea ref changes
    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        // Set initial styles
        textarea.style.resize = "none"
        textarea.style.transition = "height 0.1s ease-out"
        textarea.style.minHeight = `${minHeight}px`
        textarea.style.maxHeight = `${maxHeight}px`

        // Initial resize
        resize()

        // Handle input events for real-time resizing
        const handleInput = () => {
            // Use requestAnimationFrame for smooth resizing
            requestAnimationFrame(resize)
        }

        textarea.addEventListener("input", handleInput)

        // Handle window resize
        const handleWindowResize = () => {
            requestAnimationFrame(resize)
        }

        window.addEventListener("resize", handleWindowResize)

        return () => {
            textarea.removeEventListener("input", handleInput)
            window.removeEventListener("resize", handleWindowResize)
        }
    }, [resize, minHeight, maxHeight])

    return {
        textareaRef,
        resize,
    }
}
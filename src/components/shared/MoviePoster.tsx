'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAdditionDataFromTmdb } from '@/lib/actions/movies.actions'
import { cn } from '@/lib/utils'

export default function PosterImage({
    poster,
    title,
    imdbId,
    className
}: {
    poster: string
    title?: string
    imdbId?: number
    className?: string
}) {
    const [imgSrc, setImgSrc] = useState(poster)
    const [hasTriedFallback, setHasTriedFallback] = useState(false)

    useEffect(() => {
        if (poster) {
            setImgSrc(poster)
            setHasTriedFallback(false)
        }
    }, [poster])

    const handleImageError = async () => {
        if (!hasTriedFallback && imdbId) {
            try {
                const { posterUrl } = await getAdditionDataFromTmdb(imdbId)
                setImgSrc(posterUrl)
                // console.log({ posterUrl })
                setHasTriedFallback(true)
            } catch {
                setImgSrc('/images/poster-placeholder.svg')
                setHasTriedFallback(true)
            }
        } else {
            // If fallback also fails, set to local placeholder
            setImgSrc('/images/poster-placeholder.svg')
        }
    }

    return (
        <Image
            src={imgSrc}
            alt={title || 'Movie poster'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            className={cn(className)}
            placeholder="blur"
            blurDataURL="/images/poster-placeholder.svg"
            onError={handleImageError}
            unoptimized
        />
    )
}

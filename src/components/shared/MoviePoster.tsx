'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getAdditionDataFromTmdb } from '@/lib/actions/movies.actions'

export default function PosterImage({
    poster,
    title,
    imdbId,
}: {
    poster: string
    title?: string
    imdbId?: number
}) {
    const [imgSrc, setImgSrc] = useState(poster)
    const [hasTriedFallback, setHasTriedFallback] = useState(false)

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
            className="object-cover transition duration-200"
            placeholder="blur"
            blurDataURL="/images/poster-placeholder.svg"
            onError={handleImageError}
        />
    )
}

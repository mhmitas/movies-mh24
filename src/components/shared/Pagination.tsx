"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '../ui/badge'

type PaginationProps = {
    page: number | string,
    totalPages: number,
    urlParamName?: string
}

const PaginationComponent = ({ page, totalPages, urlParamName }: PaginationProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = Number(page)

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || 'page',
            value: page.toString(),
        })

        router.push(newUrl)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    const getPageNumbers = () => {
        const maxButtons = 4
        const pages = []

        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2))
        let endPage = startPage + maxButtons - 1

        if (endPage > totalPages) {
            endPage = totalPages
            startPage = Math.max(1, endPage - maxButtons + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages
    }

    return (
        <section className='my-container'>

            <Pagination>
                <PaginationContent className='transition'>
                    {currentPage > 1 && <PaginationItem>
                        <Button
                            size="responsive"
                            variant="primary"
                            onClick={() => handlePageChange(Number(currentPage) - 1)}
                        // asChild
                        >
                            <ChevronLeft />
                            <span>Previous</span>
                        </Button>
                    </PaginationItem>}
                    {/* Page Numbers */}
                    {getPageNumbers().map((pageNum) => (
                        <PaginationItem key={pageNum}>
                            <Button
                                variant={pageNum === currentPage ? "default" : "ghost"}
                                className='cursor-pointer rounded-full'
                                size={'responsive'}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageChange(pageNum)
                                }}
                            >
                                {pageNum}
                            </Button>
                        </PaginationItem>
                    ))}
                    {currentPage < totalPages && <PaginationItem>
                        <Button
                            size="responsive"
                            variant="primary"
                            onClick={() => handlePageChange(Number(currentPage) + 1)}
                        >
                            <span>Next</span>
                            <ChevronRight />
                        </Button>
                    </PaginationItem>}
                    <Badge className='py-1 px-2 hidden sm:block' variant='outline'>/ {totalPages}</Badge>
                </PaginationContent>
            </Pagination>

        </section>
    )
}

export default PaginationComponent
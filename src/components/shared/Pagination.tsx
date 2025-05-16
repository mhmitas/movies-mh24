"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationProps = {
    page: number | string,
    totalPages: number,
    urlParamName?: string
}

const PaginationComponent = ({ page, totalPages, urlParamName }: PaginationProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const onClick = (btnType: string) => {
        const pageValue = btnType === 'next'
            ? Number(page) + 1
            : Number(page) - 1

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || 'page',
            value: pageValue.toString(),
        })

        router.push(newUrl, { scroll: false })
    }

    return (
        <section>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <Button
                            size="lg"
                            variant="primary"
                            className="w-28"
                            onClick={() => onClick('prev')}
                            disabled={Number(page) <= 1}
                            asChild
                        >
                            <PaginationPrevious />
                        </Button>
                    </PaginationItem>
                    {/* <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem> */}
                    <PaginationItem>
                        <Button
                            size="lg"
                            variant="primary"
                            className="w-28"
                            onClick={() => onClick('next')}
                            disabled={Number(page) >= totalPages}
                            asChild
                        >
                            <PaginationNext />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </section>
    )
}

export default PaginationComponent
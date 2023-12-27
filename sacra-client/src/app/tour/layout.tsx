import type { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Панорамный тур",
};

export default function TourLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%] pt-24 mb-6">
            {children}
        </div>
    )
}

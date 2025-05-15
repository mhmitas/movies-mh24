import React from 'react'

type MovieInfoProps = {
    genres?: string[];
    countries?: string[];
    cast?: string[];
};

const MovieMetadata = ({ genres, cast, countries }: MovieInfoProps) => {
    return (
        <section className='space-y-2'>
            <MetaDataRow title='Genres' items={genres} />
            <MetaDataRow title='Countries' items={countries} />
            <MetaDataRow title='Casts' items={cast} />
        </section>
    )
}

export default MovieMetadata;

function MetaDataRow({ title, items }: { title: string; items?: string[] | undefined }) {
    return (
        <div className='grid grid-cols-5 max-w-3xl'>
            <div className='col-span-1'>{title}</div>
            <div className='col-span-4 flex flex-wrap gap-x-2.5'>
                {items?.map((item, index) => (
                    <span key={index} className='font-semibold'>{item}</span>
                ))}
            </div>
        </div>
    )
}

export const MovieActionButton = ({ icon }: { icon: React.ReactNode }) => (
    <button className="custom-primary-btn text-xl rounded-full">
        {icon}
    </button>
);
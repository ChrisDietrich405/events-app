import React from 'react'
import Image from "next/image"
import Link from "next/link"

const Events = ({data}) => {
  return (
    <div>
        {data.map((event) => {
            return (
                <Link href={`/events/${event.id}`} key={event.id}>
                    <Image src={event.image} alt={event.title} width={210} height={333}/>
                    <h2>{event.title}</h2>
                </Link>
            )
        })}

    </div>
  )
}

export default Events

export async function getStaticProps() {
    const { events_categories } = await import("/data/data.json")

    return {
        props: {
            data: events_categories
        }
    }
} 
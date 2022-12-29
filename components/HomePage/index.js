import React from 'react'
import Link from "next/link"
import Image from "next/image"

const HomePage = ({data}) => {
  return (
    <main>
    {data.map((event) => (
      <Link href={`/events/${event.id}`} key={event.id}>
        <Image src={event.image} alt={event.title} width={100} height={100}/>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
      </Link>
    ))}
  </main>

  )
}

export default HomePage
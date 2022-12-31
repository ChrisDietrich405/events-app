import React from "react";
import Image from "next/image";
import Link from "next/link";

const EventsCategoryPage = ({ data, pageName }) => {
  return (
    <div>
      {data.map((event) => {
        return (
          <>
          <h1>{pageName}</h1>
            <Link href={`/events/${event.city}/${event.id}`} key={event.id}>
              <Image
                src={event.image}
                width={200}
                height={200}
                alt={event.title}
              />
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default EventsCategoryPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const eventPaths = events_categories.map((event) => {
    return {
      params: {
        cat: event.id.toString(),
      },
    };
  });
  return {
    paths: eventPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");
  const data = allEvents.filter((event) => event.city === id);

  return {
    props: {
      data,
      pageName: id
    },
  };
}


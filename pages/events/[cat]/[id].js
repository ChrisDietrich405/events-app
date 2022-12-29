import React from "react";
import Image from "next/image";
const SingleEvent = ({ data }) => {
  
  const onSubmit = () => {
    
  }

  return (
    <div>
      <Image src={data.image} width={300} height={300} alt={data.title} />
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <form onSubmit={onSubmit}>
      <label for="reg">Register</label>
      <input type="email" id="reg"  />
      <button type="button">submit</button>
      </form>
    </div>
  );
};

export default SingleEvent;

export async function getStaticPaths() {
  const { allEvents } = await import("/data/data.json");
  const allPaths = allEvents.map((event) => {
    return {
      params: {
        cat: event.city,
        id: event.id,
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.id;
  const { allEvents } = await import("/data/data.json");
  const data = allEvents.find((event) => event.id === id);

  return {
    props: {
      data,
    },
  };
}

// export async function getStaticPaths() {
//   const data = await import('/data/data.json');
//   const allEvents = data.allEvents;

//   const allPaths = allEvents.map((path) => {
//     return {
//       params: {
//         cat: path.city,
//         id: path.id,
//       },
//     };
//   });

//   return {
//     paths: allPaths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   const id = context?.params.id
//   const { allEvents } = await import("/data/data.json")
//   const data = allEvents.find((event) => event.id === id)

//   return {
//     props: {
//       data
//     }
//   }
// }

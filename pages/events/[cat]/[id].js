import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
const SingleEvent = ({ data }) => {
  const [message, setMessage] = useState("")
  const inputEmail = useRef();
  const router = useRouter()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailValue = inputEmail.current.value
    const eventId = router?.query.id
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


    if(!emailValue.match(validEmail)) {
      setMessage("enter valide email")
    }

    try {
      const response = await fetch("/api/email-registration", 
      { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: emailValue, eventId})
      }) 

      if(!response.ok) throw new Error(`error ${response.status}`)
      setMessage(data.message)
      const data = await response.json()
      console.log(data)
    
    } catch(e) {
      console.log("Error", e)
    }
  }
  

  return (
    <div>
      <Image src={data.image} width={300} height={300} alt={data.title} />
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <form onSubmit={handleSubmit}>
        <label for="reg">Register</label>
        <input ref={inputEmail} id="reg" />
        <button type="submit">submit</button>
      </form>
      <h1>{message}</h1>
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

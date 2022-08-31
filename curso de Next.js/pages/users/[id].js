import { useRouter } from "next/router";
import Layout from "../components/layout";
import Title from "../components/title";


export default function User({ user }) {
  
 //variable que va correr el objeto useRouter()
 const router = useRouter();

 console.log(router); //propiedad query

  //crear una versión fullback de la página para saber si ocupamos renderizar una versión fullback
  //se necesita el hook useRouter
  if (router.isFallback) {
    return <div>CARGANDO...</div>
  }

  return (
    <Layout>
      <Title>User ID {user.id}</Title>
      <div className='card'>
         {/* <Title>User Details</Title> */}
        <h3>User</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
        {/* <p>User ID:{router.query.id}</p> */}
      </div>

      <style jsx>
        {`
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }
  
          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }
  
          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }
  
          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
        `}
      </style>
    </Layout>
  )
}

export async function getStaticPaths() {
    //tiene una cantidad limitada de path para definir sino esta especificado retorna a la pág 404
  //   const paths = [{ params: { id: "1" } }, { params: { id: "2" } }];
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const users = await res.json();

  // const paths = [
  //   { params: { id: '1' } },
  //   { params: { id: '2' } },
  // ];

  const paths = users.map(user => {
    return {
      params: { id: `${user.id}` }
    }
  });
  
  return {
    paths,
    fallback: true
    /*que primero renderice todo el paths y alguien intenta acceder a una ruta no declarada
    getStaticPaths() en vez de llevar al usuario a la página de 404; next() va mostrar una versión fullback
    de la pagina en la primera solicitud a ese path next va a generar estaticamente el html y la in formación
    que alimenta a ese path y cuando el proceso se completo la página va a ser entonces prerenderizada con los
    props necesarios y el fullback va a hacer ser reemplazado por la página completa; next añade  ala lista
    renderizada y los request al mismo path van a servir a la página generada igual resto de las paginas que
    se generaron en este arreglo*/
  }
}
/**
 * ASIGNACIÓN: Crear ruta Dinamica de POSTS
 */
export async function getStaticProps({ params }) {
    /*el params(parametro) context es un objeto 
    que tiene la propiedad params y params tiene el id */
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await res.json();
    //tiene que devolver un objeto con la información del usuario
  return {
    props: {
      user
    }
  }
}

import Layout from "../components/layout";
import Title from "../components/title";
import Link from 'next/link';

export default function Users({users}){
    return(
        <Layout>
            <Title>Users Page</Title>
            <div className="grid">
                {users.map(user => {
                    return (
                        <Link href={'/users/[id]'} as={`/users/${user.id}`} key={`/users/${user.id}`}>
                            <a className="card">
                                <h3>User</h3>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                            </a>
                        </Link>
                    )
                })}
            </div>
            <style jsx>
      {`
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }
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

// 
export async function getStaticProps({params}) {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
  
    return {
      props: {
        users
      }
    }
  }

  /**
   * getStaticPaths() => es requerida para paginas dinamicas con contendido 
   * estatico 
   * 
   * Path renderizadas para las páginas estaticas que estan utiliznado ruteo 
   * dinamico 
   * El problema de Path es por qué el path de cada una de esas páginas del 
   * detalle de usuario cada una de estas deben ser generado desde el momento
   * que ponemos a construir la aplicación, pero no se le ha dicho a nextjs
   * esos path estáticos que necesitan general
   *- path es la URL exacta para acceder a un  post por
   *  Ejemplo: /users/1, /users/2 => path 
   *           /users/[id] => ruta dinamica 
   * 
   *-el path es el mismo que la ruta dinamica 
   cuando una página tiene rutas dinamicas y usa getStaticProps(); se 
   debe usar una funcion getStaticPaths() 
   path => define cuales son los path que van hacer renderizados y esta 
   propiedad es un arreglo de objetos que contienen

   * En el landing path tenemos todos los enlaces a los usuarios y una 
   caracteristica,es que cuando tenemos enlaces que están utilizando el
   componente de link es la página de landing de usuarios y aquí tenemos
   el archivo de la unión de usuarios cuando tenemos un link visible en la 
   pantalla next va hacer por detras va hacer un perject de la información
   lo cual nos permite mostrar más rapido la información de la pagina o el 
   detalle

   */
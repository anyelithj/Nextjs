// import {useRouter} from 'next/router'
import Layout from "../components/layout";
import Title from "../components/title";

export default function Post({ post }) {
  // const router = useRouter();

  return (
    <Layout>
      <Title>Post Details</Title>
      <div className="card">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
      {/* <p>Post ID: {router.query.id}</p> */}
      <style jsx>
        {`
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: black;
            text-decoration: none;
            border: 2px solid #eaeaea;
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
  );
}
/*para acceder al parametro que lo hacemos a traves del router
en el SERVER SIDE RENDERING - SSR; se hace pasandole el parametro 
context a la función; el parametro context es un objeto que tiene varias 
propiedades 
*/
export async function getServerSideProps({ params }) {
  //context.params.id
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  return {
    props: {
      // post: post
      post,
    },
  };
}

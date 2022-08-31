import Layout from "./components/layout";
import Title from "./components/title";

export default function Home(){
    return(
        <Layout>
          <Title>Home Page</Title>
          <p>Aprendamos NextJS</p>
          <style>
            {`
              p {
                color: darkgray;
              }
              p:hover {
                color: darkred;
              }
            `}
          </style>
        </Layout>
    )
}

/**
Crear aplicaciones de react que son servir sidewinder o sea que son 
pre-redenrizadas 
por el servidor 
Nextjs tiene un router determinado por archivos en la carpeta pages
va determinar las rutas disponibles en nuestra aplicación el index 
va aplicar nuestra raiz o home de la aplicación y en index definimos
un componente funcional

un aspecto importante de este router basado en archivos es que el nombre 
del archivo va a determinar el nombre de la ruta 

la asignación es una ruta nueva llamada post dentro de esa ruta vamos a 
tener un hering que diga  posts page

¨**************************************************************
                    RUTAS DINAMICAS 
***************************************************************
al anidar carpetas se crea esa misma estructura a nuestra URL
las rutas dinamicas es para acceder a las subrutas  se define 
asi una ruta dinamica [id].js

El href => tiene que hacer referencia especialmente al archivo que 
queremos utilizar
el as se encarga de mostrar el valor este string dentro de la URL
****************************************************************
            COMPONENTE LINK
****************************************************************
Para poder acceder alos componentes por medio de las rutas 
es el componente que nos permite hacer transiciones entre las rutas
desde lado del cliente
En las rutas dinamicas 
El href => tiene que hacer referencia especialmente al archivo que 
queremos utilizar para renderizar.
el props as se encarga de mostrar el valor este string que se le 
paso dentro de la URL

****************************************************************
  CONTENIDO GENERADO POR EL CLIENTE- CLIENTE SIDE GENERATION
****************************************************************
El contenido  de una página  se renderiza en el navegador utilizando 
JavaScript, el cliente hace un request al servidor web  

VENTAJAS 
*Transiciones rápidas entre páginas
*Robusta selección de librerias JavaScript

DESVENTAJAS
*SEO
*Carga inicial lenta.
FILES <-------------------------------HTTP Request------|
     WEB SERVER                                       BROWSER
                                                        |
HTTP SERVER-------------------------->HTTP Response----->
                         

****************************************************************
CONTENIDO GENERADO POR EL SERVIDOR - SERVER SIDE RENDERING - SSR
****************************************************************
*Servidor crea HTML antes de enviarlo al cliente.
*Node/ExpressJS, NextJS

VENTAJAS 
*SEO
*Carga inicial rápida.

DESVENTAJAS
*Cargas subsecuentes lentas.

*Incremento de trabajo por el servidor.
contenido pre-redelizado se construyó en la aplicación
****************************************************************
CONTENIDO ESTATICO 
****************************************************************
*No es generado ni por el cliente, ni por el servidor.
*Es servido exactamente como esta creado.
*GatsbyJS

VENTAJAS 
*Requests veloces
*SEO
*Economicos

DESVENTAJAS
*Actualizaciones por CMS.

*************************************************************
  STATIC CONTENT
*************************************************************
El contenido es renderizado cuando se contruye la aplicación
(build time) 
*/

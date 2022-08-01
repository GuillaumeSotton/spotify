//Components
import Content from '../components/Content';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

//Nextjs
import Head from 'next/head'
import { getSession } from 'next-auth/react';

const Home = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Content/>
      </main>

      <div className='sticky bottom-0'>
        <Player/>
      </div>
    </div>
  )
}

export default Home;

export async function getServerSideProps(context){
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}
//Nextjs
import { SessionProvider } from 'next-auth/react';

//Recoil
import { RecoilRoot } from 'recoil';

//Styles
import '../styles/globals.css';

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp

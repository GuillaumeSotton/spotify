import { getProviders, signIn } from 'next-auth/react'

const Login = ({ providers }) => {
  return (
    <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
      <img className="mb-5 w-52" src="https://links.papareact.com/9xl" alt="" />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className='bg-[#18D860] text-white p-5 rounded-full' onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
            Se connecter avec {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  console.log(providers);

  return {
    props: {
      providers,
    },
  }
}

import { signOut, useSession } from 'next-auth/react'
import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/layouts/DefaultLayout'

const HomePage: NextPageWithLayout = () => {
  const { data } = useSession()
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
      <button onClick={() => signOut()}>Sign out</button>
    </pre>
  )
}

HomePage.getLayout = (page) => {
  return (
    <DefaultLayout title='Início'>
      {page}
    </DefaultLayout>
  )
}

export default HomePage;
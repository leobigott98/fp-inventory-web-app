import Layout from '../../components/Layout'
import { withProtected } from '../../src/hook/route'
import { useRouter } from 'next/router'
import ProfileData from '../../components/ProfileData';
import Head from "next/head";

const Profile = () => {
  const router = useRouter()
  const { pid } = router.query

  return (
    <Layout>
    <Head>
      <title>{pid}</title>
      </Head>
      <ProfileData />
    
    </Layout>
  )
}

export default withProtected(Profile)
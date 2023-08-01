import Layout from '../../components/Layout'
import { withProtected } from '../../src/hook/route'
import { useRouter } from 'next/router'
import AssignForm from '../../components/AssignForm'
import BasicTable from '../../components/BasicTable'
import Head from "next/head";

const Comandera = () => {
  const router = useRouter()
  const { cid } = router.query

  return (
    <Layout>
    <Head>
      <title>{cid}</title>
      </Head>
    <p>Comandera: {cid}</p>
    <AssignForm 
      sn = {cid}
      comandera
    />
    <BasicTable 
        sn = {cid}
        assignments
    />
    </Layout>
  )

  
}

export default withProtected(Comandera)
import Layout from '../../components/Layout'
import { withProtected } from '../../src/hook/route'
import { useRouter } from 'next/router'
import AddForm from '../../components/AddForm'
import BasicTable from '../../components/BasicTable'
import Head from "next/head";

const Product = () => {
  const router = useRouter()
  const { phid } = router.query

  return (
    <Layout>
    <Head>
      <title>{phid}</title>
      </Head>
    {/* <p>Product: {pid}</p> */}
    
     <BasicTable 
      name = {phid}
      itemHistory
    /> 
    </Layout>
  )

  
}

export default withProtected(Product)
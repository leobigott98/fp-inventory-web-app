import Layout from '../../components/Layout'
import { withProtected } from '../../src/hook/route'
import { useRouter } from 'next/router'
import AddForm from '../../components/AddForm'
import BasicTable from '../../components/BasicTable'
import Head from "next/head";

const Product = () => {
  const router = useRouter()
  const { pid } = router.query

  return (
    <Layout>
    <Head>
      <title>{pid}</title>
      </Head>
    {/* <p>Product: {pid}</p> */}
    <AddForm 
      name = {pid}
      item
    />
    <BasicTable 
      name = {pid}
      item
    />
    
    </Layout>
  )

  
}

export default withProtected(Product)
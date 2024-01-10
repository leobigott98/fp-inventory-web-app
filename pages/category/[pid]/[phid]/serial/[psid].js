import Layout from '../../../../../components/Layout'
import { withProtected } from '../../../../../src/hook/route'
import { useRouter } from 'next/router'
import BasicTable from '../../../../../components/BasicTable'
import Head from "next/head";

const History = () => {
  const router = useRouter()
  const { psid } = router.query
  const route = router.asPath
  const category = route.split("/")[2].replace(/%20/g,' ')
  const item = route.split("/")[3].replace(/%20/g,' ')

/*   const validRoute = (route.split("/")[2]) =>{

  } */

  return (
    <Layout>
    <Head>
      <title>Historial {psid}</title>
      </Head>    
     <BasicTable 
      serial = {psid}
      category = {category}
      itemId = {item}
      serialHistory
    /> 
    </Layout>
  )

  
}

export default withProtected(History)
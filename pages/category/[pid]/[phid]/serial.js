import Layout from '../../../../components/Layout'
import { withProtected } from '../../../../src/hook/route'
import { useRouter } from 'next/router'
import AddForm from '../../../../components/AddForm'
import BasicTable from '../../../../components/BasicTable'
import Head from "next/head";
import { useEffect, useState } from 'react'
import { getItemInfo } from '../../../../src/service/DBService'


const History = () => {
  const [data, setData] = useState(null);
  const router = useRouter()
  const { phid } = router.query
  const route = router.asPath
  const category = route.split("/")[2]

  useEffect(()=>{
    async function fetchData(){
      setData(await getItemInfo(category, phid))
    }
    fetchData();
  }, [])

  return (
    <Layout>
    <Head>
      <title>Seriales {data? data.name : ''}</title>
      </Head>    
     <BasicTable 
      itemId = {phid}
      category = {category}
      serials
    /> 
    </Layout>
  )

  
}

export default withProtected(History)
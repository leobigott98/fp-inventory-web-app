import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { withProtected } from '../../src/hook/route'
import { useRouter } from 'next/router'
import AddForm from '../../components/AddForm'
import BasicTable from '../../components/BasicTable'
import Head from "next/head";
import { getCategory } from '../../src/service/DBService'

const Product = () => {
  const [data, setData] = useState(null);
  const router = useRouter()
  const { pid } = router.query

  useEffect(()=>{
    async function fetchData(){
      setData(await getCategory(pid))
    }
    fetchData();
  }, [])

  return (
    <Layout>
    <Head>
      <title>{data? data.name : ''}</title>
      </Head>
    {/* <p>Product: {pid}</p> */}
    {/* <AddForm 
      name = {pid}
      item
    /> */}
    <BasicTable 
      cid = {pid}
      name = {data? data.name : ''}
      item
    />
    
    </Layout>
  )

  
}

export default withProtected(Product)
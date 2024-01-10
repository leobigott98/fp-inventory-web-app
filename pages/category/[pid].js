import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { withProtected } from '../../src/hook/route'
import { useRouter } from 'next/router'
import AddForm from '../../components/AddForm'
import BasicTable from '../../components/BasicTable'
import Head from "next/head";
import { getCategory } from '../../src/service/DBService'
import { getAuth } from 'firebase/auth'
import { getUserData } from '../../src/service/DBService'

const Product = () => {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const auth = getAuth();
  const router = useRouter()
  const { pid } = router.query

  useEffect(()=>{
    async function fetchData(){
      setData(await getCategory(pid))
      setUserData(await getUserData(auth.currentUser.uid));
    }
    fetchData();
  }, [])

  return (
    <Layout>
    <Head>
      <title>{data? data.name : ''}</title>
      </Head>
    {userData?
      userData.role == "editor" ? 
      <AddForm 
      category = {pid}
      item
      name = {data? data.name : ''}
    /> : <></> : <></>
    }
    <BasicTable 
      cid = {pid}
      name = {data? data.name : ''}
      item
      role = {userData? userData.role : null}
    />
    
    </Layout>
  )

  
}

export default withProtected(Product)
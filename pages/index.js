import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import { withProtected } from '../src/hook/route'
import BasicTable from '../components/BasicTable'
import AddForm from "../components/AddForm"
import Head from "next/head";
import Stack from '@mui/material/Stack'
import { getUserData } from '../src/service/DBService'
import { getAuth } from 'firebase/auth'
import { useState, useEffect } from 'react'

function Home() {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  useEffect(() => {  
    async function fetchData() {
      setUserData(await getUserData(auth.currentUser.uid));
    }
    
    fetchData();
  }, []);

  return (
    <Layout>
    <Head>
      <title>Inventario</title>
      </Head>
    <Stack spacing={2} direction="row">
    {userData? 
      userData.role == "editor" ? <>
      <AddForm categories/>
    </> : <></>: <></>}
    </Stack>
    
    <BasicTable categories/>
    </Layout>
  )
};

export default withProtected(Home)

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import { withProtected } from '../src/hook/route'
import BasicTable from '../components/BasicTable'
import AddForm from "../components/AddForm"
import Head from "next/head";
import Stack from '@mui/material/Stack'


function Home() {

  return (
    <Layout>
    <Head>
      <title>Inventario</title>
      </Head>
    <Stack spacing={2} direction="row">
   {/*  <AddForm product/>  */}
    </Stack>
    
    <BasicTable categories/>
    </Layout>
  )
};

export default withProtected(Home)

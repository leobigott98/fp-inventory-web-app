import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'
import { withProtected } from '../src/hook/route'
import BasicTable from '../components/BasicTable'
import AddForm from "../components/AddForm"
import Head from "next/head";


function Home() {

  return (
    <Layout>
    <Head>
      <title>Inventario</title>
      </Head>
    <AddForm product/>
    <AddForm />
    <BasicTable products/>
    </Layout>
  )
};

export default withProtected(Home)

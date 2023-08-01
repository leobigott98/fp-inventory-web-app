import Head from "next/head";
import Layout from "../components/Layout.js";
import Table from "../components/Table.js";
import { withProtected } from "../src/hook/route.js";
import NewItem from "../components/NewItem"
import AddForm from '../components/AddForm'
import BasicTable from "../components/BasicTable.js";

function configuration() {
  return (
    <Layout>
    <Head>
      <title>Comanderas</title>
      </Head>
    
    </Layout>
  );
}

export default withProtected(configuration);
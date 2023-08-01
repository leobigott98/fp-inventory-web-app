import Head from "next/head";
import Layout from "../components/Layout.js";
import Table from "../components/Table.js";
import { withProtected } from "../src/hook/route.js";
import NewItem from "../components/NewItem"
import AddForm from '../components/AddForm'
import BasicTable from "../components/BasicTable.js";

function comanderas() {
  return (
    <Layout>
    <Head>
      <title>Comanderas</title>
      </Head>
    {/* <AddForm/> */}
    <NewItem/>
    <BasicTable comanderas/>
    {/* <Table /> */}
    </Layout>
  );
}

export default withProtected(comanderas);

import Head from "next/head";
import { notVerified } from "../src/hook/route.js";
import BasicCard from "../components/BasicCard.js";

function pendingVerification() {

  return (
    <>
      <Head>
      <title>Pending verification</title>
      </Head>
      <BasicCard />
    </>
  );
}

export default notVerified(pendingVerification);
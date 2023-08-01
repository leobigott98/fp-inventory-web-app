import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout.js";
import SignIn from "../components/SignIn";
import { withPublic } from "../src/hook/route.js";

function Login() {

  return (
    <>
      <Head>
      <title>Login</title>
      </Head>
      <SignIn />
    </>
  );
}

export default withPublic(Login);

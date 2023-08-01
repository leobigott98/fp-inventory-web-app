import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout.js";
import ForgotPassword from "../components/ForgotPassword";
import { withPublic } from "../src/hook/route.js";

function PasswordReset() {

  const error = `CREDENCIALES INCORRECTAS. INTENTE NUEVAMENTE`;

  return (
    <>
      <Head>
        <title>Password Reset</title>
      </Head>
      {/* <Error 
      message = {error}
      /> */}
      <ForgotPassword />
    </>
  );
}

export default withPublic(PasswordReset);
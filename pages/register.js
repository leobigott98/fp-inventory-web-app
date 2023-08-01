import Layout from '../components/Layout'
import SignUp from '../components/SignUp'
import { withPublic } from '../src/hook/route';
import Head from "next/head";

function Register(){
    return(
        <>
        <Head>
        <title>Register</title>
      </Head>
            <SignUp />
        </>
    )
}

export default withPublic(Register);
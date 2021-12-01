import { returnCats } from "../lib/api";
import Head from "next/head";
import Layout from "../components/Layout";

export async function getStaticProps() {
  const cats = await returnCats();
  return {
    props: {
      cats,
    },
    revalidate: 1,
  };
}

export default function Index({ cats }) {
  return (
    <>
      <Head>
        <title>VOKRA cats and kittens available for adoption</title>
      </Head>
      <Layout cats={cats} />
    </>
  );
}

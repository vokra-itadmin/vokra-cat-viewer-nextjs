import { returnCats } from "../lib/api";
import { getPublishableCats } from "../lib/fauna";
import Head from "next/head";
import Layout from "../components/Layout";

export async function getStaticProps() {
  const resp = await getPublishableCats();
  const cats = resp.findCatsByStatus.data;
  return {
    props: {
      cats,
    },
    revalidate: 1800,
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

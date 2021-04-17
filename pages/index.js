import { fetchCats, sanitizeCats } from "../lib/api";
import Layout from "../components/Layout";

export async function getStaticProps() {
  const dirtyCats = await fetchCats();
  const cats = await sanitizeCats(dirtyCats.animals);
  return {
    props: {
      cats,
    },
    revalidate: 1,
  };
}

export default function Index({ cats }) {
  return <Layout cats={cats} />;
}

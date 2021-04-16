import { fetchCats, sanitizeCats } from "../lib/api";
import Layout from "../components/Layout";

export async function getServerSideProps() {
  const dirtyCats = await fetchCats();
  const cats = await sanitizeCats(dirtyCats.animals);
  return {
    props: {
      cats,
    },
  };
}

export default function Index({ cats }) {
  return <Layout cats={cats} />;
}

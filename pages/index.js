import { fetchCats } from "../lib/api";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
  const initialState = await fetchCats();
  return {
    props: {
      initialState,
    },
  };
}

export default function Index({ initialState }) {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    setCats(initialState.animals);
  }, [initialState]);
  useEffect(() => {
    console.log("cats: ", cats);
  }, [cats]);
  return <Layout cats={cats} />;
}

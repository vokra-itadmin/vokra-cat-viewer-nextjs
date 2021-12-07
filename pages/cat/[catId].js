import { useRouter } from "next/router";
import { returnCat, returnCats, returnAdoptedCats } from "../../lib/api";
import CatDetails from "../../components/CatDetails";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FETCH_URL from "../../config/api";

export async function getStaticPaths() {
  let cats = [];
  const promises = await Promise.all([returnCats(), returnAdoptedCats()]).then(
    (res) => {
      cats = res[0].concat(res[1]);
    }
  );

  return {
    paths: cats.map((cat) => ({
      params: {
        catId: cat["Internal-ID"],
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let cats = [];
  const cat = await returnCat(params.catId);
  const bonded = cat.Attributes.some(
    (element) => element.AttributeName === "Bonded"
  );
  if (bonded === true) {
    const bondedID = cat.PreviousIds.find(
      (element) => element.Type === "Visibility"
    );
    if (bondedID) {
      const catBonded = await returnCat(bondedID.IdValue);
      if (!catBonded.hasOwnProperty("error_message")) {
        cats.push(catBonded);
      }
    }
  }
  let timeout = await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    props: {
      cats: cats,
      cat: cat,
    },
    revalidate: 1800,
  };
}

const CatPage = ({ cat, cats }) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <div className="w-full flex justify-center bg-vokra-gray">
        <div className="" style={{ width: "1200px" }}>
          <CatDetails cat={cat} cats={cats} position="static" url />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CatPage;

import { useRouter } from "next/router";
import { returnCats, returnAdoptedCats } from "../../lib/api";
import CatDetails from "../../components/CatDetails";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export async function getStaticPaths() {
  let cats = [];
  const promises = await Promise.all([returnCats(), returnAdoptedCats()]).then(
    (res) => {
      cats = res[0].concat(res[1]);
    }
  );
  return {
    paths: cats.map((i) => ({ params: { catId: i.ID } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  let cats = [];
  const promises = await Promise.all([returnCats(), returnAdoptedCats()]).then(
    (res) => {
      cats = res[0].concat(res[1]);
    }
  );
  return {
    props: {
      cats,
      catId: params.catId,
    },
    revalidate: 1800,
  };
}

const CatPage = ({ cats }) => {
  const router = useRouter();
  const { catId } = router.query;
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <div className="w-full flex justify-center bg-vokra-gray">
        <div className="" style={{ width: "1200px" }}>
          <CatDetails
            cat={cats.find((i) => i.ID === catId)}
            cats={cats}
            position="static"
            url
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CatPage;

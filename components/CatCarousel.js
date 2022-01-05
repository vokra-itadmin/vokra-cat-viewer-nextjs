import Image from "next/image";
import Ribbon from "./Ribbon";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function CatCarousel({ cat }) {
  return (
    <div className="lg:p-4">
      <div className="relative">
        {cat.Status === "Healthy In Home" ||
        cat.Status === "Adoptions: Contract and Payment (Not on Website)" ||
        cat.Status === "Adoptions: Viewing (Not on Website)" ||
        cat.Status === "Adoptions: Available (Not on Website)" ? (
          <Ribbon color="bg-vokra-dark">Adopted!</Ribbon>
        ) : (
          ""
        )}
        <Carousel showThumbs={false} showIndicators={false}>
          {cat.Photos.map((photo, index) => (
            <div key={index}>
              <Image
                layout="responsive"
                width={1000}
                height={1000}
                src={photo}
                alt={`${cat.Name}, a ${cat.Breed} ${
                  cat.Color ? cat.Color + " " : ""
                }${cat.Pattern ? cat.Pattern + "" : ""}cat ${index + 1}`}
              />
            </div>
          ))}
          {cat.Videos.map((video) => (
            <iframe
              key={video.EmbedUrl}
              className="h-full"
              src={video.EmbedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

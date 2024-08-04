import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/tw-components/container";
import Image from "next/image";

const TopLocation = () => {
  const locations = [
    {
      city: "VERONA, ITALY",
      events: 300,
      imgSrc: "/images/pitch-bg.png",
      flag: "🇮🇹",
    },
    {
      city: "LAGOS, NIGERIA",
      events: 300,
      imgSrc: "/images/pitch-bg.png",
      flag: "🇳🇬",
    },
    {
      city: "COSTA MESA, UNITED STATES",
      events: 300,
      imgSrc: "/images/pitch-bg.png",
      flag: "🇺🇸",
    },
    {
      city: "LONDON, UNITED KINGDOM",
      events: 300,
      imgSrc: "/images/pitch-bg.png",
      flag: "🇬🇧",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // for tablet and desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // for medium devices (e.g. tablets)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // for small devices (e.g. mobile)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="bg-[#221A14] lg:bg-topLocation md:bg-cover">
      <Container className="py-8 md:py-16 px-4 md:px-0">
        <h2 className="text-3xl font-pally-medium my-7 text-white">
          Top Locations
        </h2>
        <Slider {...settings}>
          {locations.map((location, index) => (
            <div key={index} className="relative px-2 ">
              <div className="h-[250px]">
                <Image
                  className="w-full h-full rounded-lg"
                  src={location.imgSrc}
                  alt={location.city}
                  width={250}
                  height={250}
                />
              </div>
              <div className="absolute bottom-3 left-6 flex flex-col items-start text-white">
                <span className="text-lg">{location.flag}</span>
                <h3 className="text-xl font-semibold">{location.city}</h3>
                <p className="mt-1">({location.events} events)</p>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute right-5 w-12 h-12 bg-white rounded-full p-5 shadow-md`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-white rounded-full p-2 shadow-md`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

export default TopLocation;

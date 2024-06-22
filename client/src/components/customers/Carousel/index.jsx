import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import axios from "axios";
import { useEffect, useState } from "react";

const Carousel = () => {

  const [pics, setPics] = useState([])

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/banner');
        // console.log(data.banners);
        const activeBanners = data.banners.filter(banner => banner.status === true);
        setPics(activeBanners);
        // console.log(activeBanners)
      } catch (error) {
        console.log("Error fetching the banner image", error);
      }
    }
    fetchBanner();
  }, [])

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000 }}
      className="lg:h-[390px] lg:rounded-md"
    >
      {pics?.slice().reverse().map((banner) => (
        <SwiperSlide key={banner._id}>
          <img
            src={`https://api.discounthutdeshit.tailormaster.xyz/${banner.banner_image}`}
            alt={banner.bannerName}
            className="rounded-md w-full lg:h-full lg:object-fill"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

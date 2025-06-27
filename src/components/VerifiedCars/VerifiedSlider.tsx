'use client'
import { MidCard } from '@/components/new/MidCard';
import Slider from "react-slick";
import { SmallCard } from '@/types/Catalog';

export default function VerifiedSlider({data, isAuth}: {data: SmallCard[], isAuth: boolean}) {
  
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "30px",
    slidesToShow: 1,
    speed: 1000
  };


  return (
      <div className='md:hidden slider-container'>
        <Slider {...settings}>
          {data?.map((car) => (
            <div key={car.id} className='px-2'>
              <MidCard isAuth={isAuth} {...car} />
            </div>
          ))}
        </Slider>
      </div>
  );
}

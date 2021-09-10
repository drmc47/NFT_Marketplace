import Cards from "../card/card.jsx"
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import style from "../slider/slider.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function SliderImage() {

  const stateAllNFTs = useSelector((state) => state.allNFTs);
  const selected = stateAllNFTs.slice(26,36)
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //     dispatch(getNFTs());
  //   }, [dispatch]);

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true
    }
    return (
      <div>
        <Slider {...settings}>
        {selected. length > 0 ?(
                selected.map((ele) => (
                    <div className={style.house}>
                        <Cards ele={ele}/>
                    </div>
                ))
            ): null}
          
        </Slider>
      </div>
    );
}


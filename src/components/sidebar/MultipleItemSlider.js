import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "../Assests/multipleSlider.scss";
import topIndianArtistData from "../Data/topIndianArtistData";


export default class MultipleItemSlider extends Component {




  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        <div className="multiple-slider">
        <Slider {...settings}>  
          {topIndianArtistData.map((data, index)=>{
            return(
              <>
              <div>
                    <div className="image-container">
                      <img src={data.cover} alt="artist"/>
                    </div>
                    <div className="description">
                      <h2>{data.title}</h2>
                      <p>{data.desc}</p>
                    </div>
                  </div> 

              </>
            )
          })}         
          </Slider>
        </div>
      </>
    );
  }
}

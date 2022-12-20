import React from 'react'
import Slider from 'react-slick'
import artistSliderData from '../../Data/artistSliderData'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../../Assests/Slider.scss"

const SliderPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => {
          return <ul style={{ marginBottom: "20px", display:"block", position:"absolute" }}>{dots}</ul>
        },
      }
  return (
    <>
    <Slider {...settings}>
        {artistSliderData.map((value, index) => {
          return (
            <>
              <div className='main-carousel box d_flex top' key={index}>
                <div className='left'>
                  <h1>{value.title}</h1>
                  <p>{value.desc}</p>
                  <button className='btn-primary'>Visit Collections</button>
                </div>
                <div className='right'>
                  <img src={value.cover} alt='' />
                </div>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default SliderPage
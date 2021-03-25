import Slider from "./Slider";
/* import "./slider.css"; */

export default function Slideshow() {
  return (
    <div className="wrapper">
      <Slider>
        <div>
          <img src="/img/slide_1.jpg" alt="" />
        </div>
        <div>
          <img src="/img/slide_2.jpg" alt="" />
        </div>
      </Slider>
    </div>
  );
}

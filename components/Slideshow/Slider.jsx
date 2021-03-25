import { useState, useRef } from "react";

export default function Slider(props) {
  const [dragStart, setDragStart] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(new Date());
  const [index, setIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [transition, setTransition] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  const slider = useRef();

  function getDragX(event, isTouch) {
    return isTouch ? event.touches[0].pageX : event.pageX;
  }

  function handleDragStart(event, isTouch) {
    const x = getDragX(event, isTouch);
    setDragStart(x);
    setDragStartTime(new Date());
    setTransition(false);
    setSlideWidth(slider.offsetWidth);
  }

  function handleDragMove(event, isTouch) {
    const x = getDragX(event, isTouch);
    const offset = dragStart - x;
    const percentageOffset = offset / slideWidth;
    const newIndex = lastIndex + percentageOffset;
    const SCROLL_OFFSET_TO_STOP_SCROLL = 30;

    // Stop scrolling if you slide more than 30 pixels
    if (Math.abs(offset) > SCROLL_OFFSET_TO_STOP_SCROLL) {
      event.stopPropagation();
      event.preventDefault();
    }

    setIndex(newIndex);
  }

  function handleDragEnd() {
    const { children } = props;

    const timeElapsed = new Date().getTime() - dragStartTime.getTime();
    const offset = lastIndex - index;
    const velocity = Math.round((offset / timeElapsed) * 10000);

    let newIndex = Math.round(index);

    if (Math.abs(velocity) > 5) {
      newIndex = velocity < 0 ? lastIndex + 1 : lastIndex - 1;
    }

    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= children.length) {
      newIndex = children.length - 1;
    }

    setDragStart(0);
    setIndex(newIndex);
    setLastIndex(newIndex);
    setTransition(true);
  }

  function goToSlide(index, event) {
    const { children, loop } = props;

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (index < 0) {
      index = loop ? children.length - 1 : 0;
    } else if (index >= children.length) {
      index = loop ? 0 : children.length - 1;
    }

    setIndex(index);
    setLastIndex(index);
    setTransition(true);
  }

  function renderNav() {
    const { children } = props;

    const nav = children.map((slide, i) => {
      const buttonClasses =
        i === lastIndex
          ? "Slider-navButton Slider-navButton--active"
          : "Slider-navButton";
      return (
        <button
          className={buttonClasses}
          key={i}
          onClick={(event) => goToSlide(i, event)}
        />
      );
    });

    return <div className="Slider-nav">{nav}</div>;
  }

  function renderArrows() {
    const { children, loop, showNav } = props;
    const arrowsClasses = showNav
      ? "Slider-arrows"
      : "Slider-arrows Slider-arrows--noNav";

    return (
      <div className={arrowsClasses}>
        {loop || lastIndex > 0 ? (
          <button
            className="Slider-arrow Slider-arrow--left"
            onClick={(event) => goToSlide(lastIndex - 1, event)}
          />
        ) : null}
        {loop || lastIndex < children.length - 1 ? (
          <button
            className="Slider-arrow Slider-arrow--right"
            onClick={(event) => goToSlide(lastIndex + 1, event)}
          />
        ) : null}
      </div>
    );
  }

  /* Render function started here */
  const { children, showArrows, showNav } = props;

  const slidesStyles = {
    width: `${100 * children.length}%`,
    transform: `translateX(${-1 * index * (100 / children.length)}%)`,
  };
  const slidesClasses = transition
    ? "Slider-slides Slider-slides--transition"
    : "Slider-slides";

  return (
    <div className="Slider" ref={slider}>
      {showArrows ? renderArrows() : null}
      {showNav ? renderNav() : null}

      <div
        className="Slider-inner"
        onTouchStart={(event) => handleDragStart(event, true)}
        onTouchMove={(event) => handleDragMove(event, true)}
        onTouchEnd={() => handleDragEnd(true)}
      >
        <div className={slidesClasses} style={slidesStyles}>
          {children}
        </div>
      </div>
    </div>
  );
}

Slider.defaultProps = {
  loop: true,
  selected: 0,
  showArrows: true,
  showNav: true,
};

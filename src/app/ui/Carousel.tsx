import React, {
  CSSProperties,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

interface ArrowComponentProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const ArrowStyle = styled.div`
  .slick-next,
  .slick-prev {
    &::before {
      font-size: 20px;
      color: black;
    }
  }
`;

const SliderWrapper = styled.div`
  margin: auto;
  width: calc(100% - 50px);
`;

function SampleNextArrow({ className, style, onClick }: ArrowComponentProps) {
  return (
    <ArrowStyle>
      <div className={className} onClick={onClick} />
    </ArrowStyle>
  );
}

function SamplePrevArrow({ className, style, onClick }: ArrowComponentProps) {
  return (
    <ArrowStyle>
      <div
        className={className}
        style={{ ...style, display: 'block', color: 'black' }}
        onClick={onClick}
      />
    </ArrowStyle>
  );
}

export default function Carousel({
  children,
  setChange,
}: {
  children: React.ReactNode;
  setChange?: Dispatch<SetStateAction<number>>;
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul style={{ marginBottom: '10px' }}> {dots} </ul>
      </div>
    ),
    afterChange: (current: number) => {
      if (setChange) setChange(current);
    },
  };
  return (
    <SliderWrapper>
      <Slider {...settings}>{children}</Slider>
    </SliderWrapper>
  );
}

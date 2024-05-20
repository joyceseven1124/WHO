import React, {
  CSSProperties,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useRef,
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
const ForwardRefSampleNextArrow = forwardRef<any, ArrowComponentProps>(
  function SampleNextArrow({ className, style, onClick }, ref) {
    const NextArrowRef = useRef<any>();
    useImperativeHandle(ref, () => ({
      click: () => {
        if (NextArrowRef.current) {
          NextArrowRef.current.click();
        }
      },
    }));
    return (
      <ArrowStyle>
        <div className={className} onClick={onClick} ref={NextArrowRef} />
      </ArrowStyle>
    );
  }
);

const ForwardRefSamplePrevArrow = forwardRef<any, ArrowComponentProps>(
  function SamplePrevArrow({ className, style, onClick }, ref) {
    const prevArrowRef = useRef<any>();
    useImperativeHandle(ref, () => ({
      click: () => {
        if (prevArrowRef.current) prevArrowRef.current.click();
      },
    }));
    return (
      <ArrowStyle>
        <div
          className={className}
          style={{ ...style, display: 'block', color: 'black' }}
          onClick={onClick}
          ref={prevArrowRef}
        />
      </ArrowStyle>
    );
  }
);

export default function Carousel({
  children,
  setChange,
  refPrevProp,
  refNextProp,
}: {
  children: React.ReactNode;
  setChange?: Dispatch<SetStateAction<number>>;
  refPrevProp: any;
  refNextProp: any;
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ForwardRefSampleNextArrow ref={refNextProp} />,
    prevArrow: <ForwardRefSamplePrevArrow ref={refPrevProp} />,
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

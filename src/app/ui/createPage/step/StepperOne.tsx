import { Theme } from '@/src/app/theme';
import ButtonCva from '@/src/app/ui/ButtonCva';
import Carousel from '@/src/app/ui/Carousel';
import BusinessCardBook from '@/src/app/ui/businessCard/BusinessCardBook';
import BusinessCardFlip from '@/src/app/ui/businessCard/BusinessCardFlip';
import BusinessCardSlide from '@/src/app/ui/businessCard/BusinessCardSlide';
import { useAppDispatch, useAppSelector, useAppStore } from '@/src/lib/RThooks';
import {
  editCardData,
  selectCardData,
} from '@/src/lib/feature/businessCardDataSlice';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';

const SlideItemWrapper = styled.div`
  width: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 8px;
`;

const growAnimation = keyframes`
  0% {
    width: 10px;
    height: 10px;
    opacity: 1;
  }
  100% {
    width: 50px;
    height: 50px;
    opacity: 1;
  }
`;

const checkShowAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SlideCheck = styled.div`
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 25px;
  position: absolute;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -1px 0px 7px 0px rgba(50, 50, 50, 0.75);
  animation: ${growAnimation} 0.2s ease-in;
  .check-icon {
    animation: ${checkShowAnimation} 0.5s ease-in;
  }
`;

function Check() {
  return (
    <SlideCheck>
      <CheckIcon className="check-icon w-8 text-white" />
    </SlideCheck>
  );
}

export default function StepperOne() {
  const store = useAppStore();
  const data = useAppSelector(selectCardData);
  const cardType = data.cardType;
  const dispatch = useAppDispatch();
  const typeList = [
    'BusinessCardSlide',
    'BusinessCardBook',
    'BusinessCardFlip',
  ];

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const checkHandle = () => {
    if (typeList.length > 0) {
      const data = {
        cardType: typeList[currentIndex],
      };
      dispatch(editCardData(data));
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <div className="mb-10">
        <Carousel setChange={setCurrentIndex}>
          <SlideItemWrapper>
            {cardType === 'BusinessCardSlide' && <Check />}
            {animate && (
              <BusinessCardSlide
                time="2024/2/4"
                name="維納斯La"
                work="YouTuber"
                description="夜來風雨聲，花落知多少。風雨交加的夜晚，花朵在風中飄零，無聲地述說著無法言說的心事。它們代表著堅強和希望，當風雨過後，依舊綻放著美麗的花朵，象徵著生命的力量和永恆的希望"
                userPhoto="/demoBusinessCard/personOne.jpg"
                userPhotoAlt="demo person"
                bgPhoto={null}
                bgPhotoAlt={null}
              />
            )}
          </SlideItemWrapper>

          <SlideItemWrapper>
            {cardType === 'BusinessCardBook' && <Check />}
            <BusinessCardBook
              time="2024/2/4"
              name="一諾"
              work="頭頂農夫"
              description=" 大家好，我喜歡在頭上種草，骨子中的農夫，請多指教"
              userPhoto="/demoBusinessCard/bigPerson.jpg"
              userPhotoAlt="demo person"
              bgPhoto={null}
              bgPhotoAlt={null}
            />
          </SlideItemWrapper>

          <SlideItemWrapper>
            {cardType === 'BusinessCardFlip' && <Check />}
            <BusinessCardFlip
              time="2024/2/4"
              name="樂天"
              work="小丑"
              description="有一隻貓問另一隻貓：“你為什麼不喜歡用電腦？”另一隻貓回答說：“因為我是老鼠！”"
              userPhoto="/demoBusinessCard/personTwo.jpg"
              bgPhoto="/demoBusinessCard/bgDecorateBlack.jpg"
              userPhotoAlt="demo person"
              bgPhotoAlt="banner-image"
            />
          </SlideItemWrapper>
        </Carousel>
        <div className="mt-10 flex justify-end">
          <ButtonCva type="button" intent={'secondary'} onClick={checkHandle}>
            選取
          </ButtonCva>
        </div>
      </div>
    </ThemeProvider>
  );
}

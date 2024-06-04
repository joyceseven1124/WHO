'use client';
import { Theme } from '@/src/app/theme';
import ButtonCva from '@/src/app/ui/ButtonCva';
import Carousel from '@/src/app/ui/Carousel';
import BusinessCardBook from '@/src/app/ui/businessCard/BusinessCardBook';
import BusinessCardFlip from '@/src/app/ui/businessCard/BusinessCardFlip';
import BusinessCardSlide from '@/src/app/ui/businessCard/BusinessCardSlide';
import { Check } from '@/src/app/ui/createPage/formComponent/smallElement/Check';
import { useAppDispatch, useAppSelector, useAppStore } from '@/src/lib/RThooks';
import {
  editCardData,
  selectCardData,
} from '@/src/lib/feature/businessCardDataSlice';
import { useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const SlideItemWrapper = styled.div`
  width: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 8px;
`;

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
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [cardType, firstRender]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const checkHandle = () => {
    setFirstRender(false);
    if (typeList.length > 0) {
      const data = {
        cardType: typeList[currentIndex],
      };
      dispatch(editCardData(data));
    }
  };

  // 控制底層元素點擊左右鍵
  const parentNextRef = useRef();
  const parentPrevRef = useRef();
  return (
    <ThemeProvider theme={Theme}>
      <div className="mb-10">
        <Carousel
          setChange={setCurrentIndex}
          refPrevProp={parentPrevRef}
          refNextProp={parentNextRef}
        >
          <SlideItemWrapper>
            {cardType === 'BusinessCardSlide' && (
              <Check
                checkIndex={0}
                firstRender={firstRender}
                setFirstRender={setFirstRender}
              />
            )}
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
            {cardType === 'BusinessCardBook' && (
              <Check
                checkIndex={1}
                refClickProp={parentNextRef}
                firstRender={firstRender}
                setFirstRender={setFirstRender}
              />
            )}
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
            {cardType === 'BusinessCardFlip' && (
              <Check
                checkIndex={2}
                refClickProp={parentPrevRef}
                firstRender={firstRender}
                setFirstRender={setFirstRender}
              />
            )}
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

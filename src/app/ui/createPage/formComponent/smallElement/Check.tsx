'use client';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

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

export function Check({
  checkIndex,
  firstRender,
  refClickProp,
  setFirstRender,
}: {
  checkIndex: number;
  firstRender?: boolean;
  refClickProp?: any;
  setFirstRender?: any;
}) {
  useEffect(() => {
    if (refClickProp && firstRender && checkIndex !== 0) {
      const timer = setTimeout(() => {
        refClickProp.current.click();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [firstRender, refClickProp, checkIndex, setFirstRender]);

  return (
    <SlideCheck>
      <CheckIcon className="check-icon w-8 text-white" />
    </SlideCheck>
  );
}

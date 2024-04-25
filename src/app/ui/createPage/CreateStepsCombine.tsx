'use client';
import FormTitle from '@/src/app/ui/createPage/FormTitle';
import HorizontalLinearStepper from '@/src/app/ui/createPage/HorizontalLinearStepper';
import StepperOne from '@/src/app/ui/createPage/step/StepperOne';
import StepperThree from '@/src/app/ui/createPage/step/StepperThree';
import StepperTwo from '@/src/app/ui/createPage/step/StepperTwo';
import { useState } from 'react';

export default function CreateStepsCombine() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <>
      <HorizontalLinearStepper
        steps={[
          '選擇卡片樣式',
          '填寫卡片資料',
          '創建關於您自己的總總',
          '檢視最終的樣式',
        ]}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      ></HorizontalLinearStepper>
      {activeStep === 0 && (
        <>
          <FormTitle>
            可以將滑鼠移入卡片中觀察，選擇好想要的樣式後，點選上方NEXT
          </FormTitle>
          <StepperOne />
        </>
      )}
      {activeStep === 1 && (
        <>
          <FormTitle>填寫所選樣式的表單，填寫完點選上方NEXT</FormTitle>
          <StepperTwo />
        </>
      )}
      {activeStep === 2 && (
        <>
          <FormTitle>
            hover底下區塊，選取想要的區塊樣式後，開始編輯自己的blog。(每張卡片都可以利用拖曳進行位置調整)
          </FormTitle>
          <StepperThree />
        </>
      )}
    </>
  );
}

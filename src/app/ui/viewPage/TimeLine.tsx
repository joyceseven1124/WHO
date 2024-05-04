import ViewTitle from '@/src/app/ui/viewPage/smallComponent/ViewTitle';
import { ComponentStructure } from '@/src/lib/feature/formDataSlice';
import {
  TimeLineDataStyle,
  TimeLineHorizontalLine,
  TimeLineWrapper,
} from '../ComponentStyle';
import TimeLineDecorate from '../createPage/formComponent/smallElement/TimeLineDecorate';

export default function TimeLine({ value }: { value: ComponentStructure }) {
  const childKeyArray = Object.keys(value?.children);
  let childComponentArray;
  if (childKeyArray) {
    childComponentArray = childKeyArray.map(
      (childKey: string, index: number) => {
        let inputText: string | undefined = '';
        let startTimeLine: string | undefined = '';
        let endTimeLine: string | undefined = '';

        if (value.children && value.children[childKey]) {
          let childData = value.children[childKey];
          inputText = childData.inputText;
          startTimeLine = childData.startTimeLine;
          endTimeLine = childData.endTimeLine;
        }

        return (
          <TimeLineWrapper key={childKey}>
            <TimeLineDecorate />
            <div className="w-full">
              {(startTimeLine || endTimeLine) && (
                <TimeLineDataStyle>
                  <div>{startTimeLine}</div>
                  <TimeLineHorizontalLine />
                  <div>{endTimeLine}</div>
                </TimeLineDataStyle>
              )}
              <div>{inputText}</div>
            </div>
          </TimeLineWrapper>
        );
      }
    );
  }
  return (
    <div className="text-black">
      <ViewTitle>{value.componentTitle}</ViewTitle>
      {childComponentArray}
    </div>
  );
}

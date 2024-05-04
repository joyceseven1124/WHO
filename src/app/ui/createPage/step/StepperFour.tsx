import { Theme } from '@/src/app/theme';
import PortfolioCard from '@/src/app/ui/viewPage/PortfolioCard';
import { useAppSelector } from '@/src/lib/RThooks';
import { selectFormData } from '@/src/lib/feature/formDataSlice';
import styled, { ThemeProvider } from 'styled-components';
import { ViewLayoutWrapper } from '../../ComponentStyle';
import ListPointer from '../../viewPage/ListPointer';
import TimeLine from '../../viewPage/TimeLine';

export default function StepperFour() {
  const formList = useAppSelector(selectFormData);
  let ComponentToRender: any;
  const viewFormListRender = Object.keys(formList).map(
    (key: string, index: number) => {
      const CurrentElement = formList[key];
      let ComponentToRender: any;
      switch (CurrentElement.componentType) {
        case 'PortfolioEditCardList':
          ComponentToRender = PortfolioCard;
          break;
        case 'ListPoints':
          ComponentToRender = ListPointer;
          break;
        case 'TimeLineEdit':
          ComponentToRender = TimeLine;
          break;
        default:
          ComponentToRender = null;
      }
      if (ComponentToRender) {
        return (
          <div key={key}>
            <ComponentToRender value={formList[key]} />
          </div>
        );
      } else {
        return null;
      }
    }
  );

  return (
    <ThemeProvider theme={Theme}>
      <ViewLayoutWrapper>{viewFormListRender}</ViewLayoutWrapper>
    </ThemeProvider>
  );
}

'use client';
import { Theme } from '@/src/app/theme';
import PortfolioCard from '@/src/app/ui/viewPage/PortfolioCard';
import { FormDataList } from '@/src/lib/feature/formDataSlice';
import { ThemeProvider } from 'styled-components';
import { ViewLayoutWrapper } from '../ComponentStyle';
import BannerCardView from './BannerCardView';
import BaseInformationView from './BaseInformationView';
import ListPointer from './ListPointer';
import StringCardView from './StringCardView';
import TimeLine from './TimeLine';

export default function CombineDataView({
  allData,
}: {
  allData: FormDataList;
}) {
  const formList = allData.formData;
  const baseData = allData.selfInformation;
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
        case 'StringCard':
          ComponentToRender = StringCardView;
          break;
        case 'BannerEditCardList':
          ComponentToRender = BannerCardView;
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
      <ViewLayoutWrapper>
        <BaseInformationView baseData={baseData} />
        {viewFormListRender}
      </ViewLayoutWrapper>
    </ThemeProvider>
  );
}

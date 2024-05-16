'use client';
import {
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
  MEDIA_QUERY_SSM,
} from '@/src/app/style';
import ViewTitle from '@/src/app/ui/viewPage/smallComponent/ViewTitle';
import { ComponentStructure } from '@/src/lib/feature/formDataSlice';
import Image from 'next/image';
import styled from 'styled-components';

const BannerCardViewWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 10px;
  ${MEDIA_QUERY_SM} {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }
`;

export default function BannerCardView({
  value,
}: {
  value: ComponentStructure;
}) {
  const childKeyArray = Object.keys(value?.children);
  let childComponentArray;
  if (childKeyArray) {
    childComponentArray = childKeyArray.map(
      (childKey: string, index: number) => {
        if (value.children && value.children[childKey]) {
          let childData = value.children[childKey];
          return (
            <BannerCardViewWrapper key={childKey}>
              {childData.imageURL && (
                <Image
                  src={childData.imageURL ? childData.imageURL : ''}
                  alt={
                    childData.imageInformation ? childData.imageInformation : ''
                  }
                  width={150}
                  height={150}
                />
              )}
              <p>{childData.inputText}</p>
            </BannerCardViewWrapper>
          );
        }
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

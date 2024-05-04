'use client';
import { ComponentStructure } from '@/src/lib/feature/formDataSlice';
import Image from 'next/image';
import styled from 'styled-components';
import {
  PortfolioCardListWrapperStyle,
  PortfolioCardStyle,
} from '../ComponentStyle';
import ViewTitle from './smallComponent/ViewTitle';

const PortfolioCardView = styled(PortfolioCardStyle)`
  height: 400px;
  display: grid;
  grid-template-rows: 200px auto fit-content;
  cursor: default;
  img {
    width: 100%;
    height: ${(props) => props.theme.portfolioCardHeight};
    object-fit: cover;
  }
  p {
    word-wrap: break-word;
    word-break: break-all;
  }
`;

const DefaultImageCard = styled.div`
  width: 100%;
  height: ${(props) => props.theme.portfolioCardHeight};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.brightGray};
  color: white;
`;

const LinkStyle = styled.a`
  width: 100%;
  text-align: end;
  margin-bottom: 0px;
  display: flex;
  align-items: flex-end;
  color: ${(props) => props.theme.brightGray};
  &:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
    color: ${(props) => props.theme.gray};
  }
`;

export default function PortfolioCard({
  value,
}: {
  value: ComponentStructure;
}) {
  const childKeyArray = Object.keys(value?.children);
  let childComponentArray;
  if (childKeyArray) {
    childComponentArray = childKeyArray.map(
      (childKey: string, index: number) => {
        let imageSrc: string | undefined = '';
        let imageAlt: string | undefined = '';
        let inputValue: string | undefined = '';
        let linkUrl: string | undefined = '';
        let linkName: string | undefined = '';
        if (value.children && value.children[childKey]) {
          let childData = value.children[childKey];
          imageSrc = childData.imageURL;
          imageAlt = childData.imageInformation;
          inputValue = childData.inputText;
          linkUrl = childData.linkURL;
          linkName = childData.linkText;
        }
        return (
          <PortfolioCardView key={childKey}>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt ? imageAlt : ''}
                width={150}
                height={150}
              />
            ) : (
              <DefaultImageCard>尚未提供圖片</DefaultImageCard>
            )}
            {inputValue ? <p>{inputValue}</p> : <p></p>}
            <LinkStyle href={linkUrl} className="block w-full justify-end">
              {linkName}
            </LinkStyle>
          </PortfolioCardView>
        );
      }
    );
  }
  return (
    <div className="text-black">
      <div className="mb-5">
        <ViewTitle>{value.componentTitle}</ViewTitle>
      </div>
      <PortfolioCardListWrapperStyle>
        {childComponentArray}
      </PortfolioCardListWrapperStyle>
    </div>
  );
}

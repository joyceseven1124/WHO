import { initialTextAreaArray } from '@/src/lib/context';
import { ComponentStructure } from '@/src/lib/feature/formDataSlice';
import styled from 'styled-components';
import { ListPointerBoardStyle, ListPointerWrapper } from '../ComponentStyle';
import ViewTitle from './smallComponent/ViewTitle';

const ViewListPointerColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const SubtitleStyle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  word-wrap: break-word;
  word-break: break-all;
`;

export default function ListPointer({ value }: { value: ComponentStructure }) {
  const childKeyArray = Object.keys(value?.children);
  let childComponentArray;
  if (childKeyArray) {
    childComponentArray = childKeyArray.map(
      (childKey: string, index: number) => {
        let listTextArray: (string | undefined)[] = initialTextAreaArray;
        let inputText: string | undefined = '';

        if (value.children && value.children[childKey]) {
          let childData = value.children[childKey];
          inputText = childData.inputText;
          if (childData.listTextArray) listTextArray = childData.listTextArray;
        }

        return (
          <ViewListPointerColumnStyle key={childKey}>
            <SubtitleStyle className="text-black">123{inputText}</SubtitleStyle>
            {listTextArray.map((element: string | undefined, index: number) => {
              return (
                <ListPointerWrapper className=" text-black" key={index}>
                  <div className="point"></div>
                  <p className="text-black">456{element}</p>
                </ListPointerWrapper>
              );
            })}
          </ViewListPointerColumnStyle>
        );
      }
    );
  }
  return (
    <>
      <ViewTitle>{value.componentTitle}</ViewTitle>
      <ListPointerBoardStyle>{childComponentArray}</ListPointerBoardStyle>
    </>
  );
}

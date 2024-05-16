import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import {
  editFormChildElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import {
  NodeKeyContext,
  initialTextAreaArray,
} from '@/src/lib/provider/context';
import { useContext } from 'react';

export default function useTextAreaInputValue(childKey: string) {
  const nodeKey = useContext(NodeKeyContext);
  const dispatch = useAppDispatch();
  const formList = useAppSelector(selectFormData);
  let childrenData: any;
  const elementData = formList[nodeKey];
  if (elementData) {
    childrenData = elementData['children'];
  }

  const handleTextAreaDispatch = (inputValue: string) => {
    dispatch(
      editFormChildElement({
        nodeKey: nodeKey,
        childKey: childKey,
        elements: { inputText: inputValue },
      })
    );
  };

  const handleTextAreaArrayDispatch = (
    inputValue: string | undefined,
    rowIndex: number
  ) => {
    const inputArray = getInputArrayValue();
    const newInputArray = [...inputArray];
    newInputArray[rowIndex] = inputValue;
    dispatch(
      editFormChildElement({
        nodeKey: nodeKey,
        childKey: childKey,
        elements: { listTextArray: newInputArray },
      })
    );
  };

  const getInputValue = () => {
    if (
      childrenData &&
      childrenData[childKey] &&
      childrenData[childKey]['inputText']
    ) {
      return formList[nodeKey]['children'][childKey]['inputText'];
    }
    return undefined;
  };

  const getInputArrayValue = () => {
    let elements: (string | undefined)[] = initialTextAreaArray;
    if (
      childrenData &&
      childrenData[childKey] &&
      Array.isArray(childrenData[childKey].listTextArray)
    ) {
      elements = childrenData[childKey]['listTextArray'] as (
        | string
        | undefined
      )[];
    }
    return elements;
  };

  const getTitleInputValue = (initNodeKey: string) => {
    if (
      formList &&
      formList[initNodeKey] &&
      formList[initNodeKey]['componentTitle']
    ) {
      const data = formList[initNodeKey]['componentTitle'];
      return data;
    }
    return undefined;
  };

  return {
    handleTextAreaArrayDispatch,
    handleTextAreaDispatch,
    getInputValue,
    getInputArrayValue,
    getTitleInputValue,
  };
}

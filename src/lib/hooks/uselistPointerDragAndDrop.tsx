import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import {
  ChangePositionChildPayload,
  changeFormChildElement,
  editFormChildElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import {
  ChildKeyContext,
  NodeKeyContext,
  initialTextAreaArray,
} from '@/src/lib/provider/context';
import { DraggableLocation, DropResult } from '@hello-pangea/dnd';
import { useContext, useState } from 'react';

type DragDropProps = (
  source: DraggableLocation,
  destination: DraggableLocation
) => void;

const useDragDropHandle = () => {
  const data = useAppSelector(selectFormData);
  const dispatch = useAppDispatch();
  const nodeKey = useContext(NodeKeyContext);
  const childData = data[nodeKey]['children'];
  const [childKey, setChildKey] = useState('0');
  const [childKeyIndex, setChildKeyIndex] = useState(0);

  const moveRowSameColumn: DragDropProps = (source, destination) => {
    if (
      !childData ||
      !childData[childKey] ||
      !childData[childKey]['listTextArray']
    ) {
      return;
    }
    const result = childData[childKey]['listTextArray'];
    const resultData = result ? [...result] : [];

    // 檢查來源和目的地索引是否有效
    if (
      source.index < 0 ||
      source.index >= resultData.length ||
      destination.index < 0 ||
      destination.index >= resultData.length ||
      source.index === destination.index
    ) {
      return; // 索引無效或相同，不進行操作
    }
    const [removed] = resultData.splice(source.index, 1);
    resultData.splice(destination.index, 0, removed);
    const payLoad = {
      nodeKey: nodeKey,
      childKey: childKey,
      elements: { listTextArray: resultData },
    };
    dispatch(editFormChildElement(payLoad));
  };

  // handling movement of row between columns
  const moveRowDifferentColumn: DragDropProps = (source, destination) => {
    const childKeyDroppable = destination.droppableId;

    if (childKeyDroppable && childKey !== '0') {
      const childKeyEnd = childKeyDroppable.split('-')[0];
      const startResult = childData[childKey]['listTextArray'];
      const startResultData = startResult
        ? [...startResult]
        : initialTextAreaArray;

      const endResult = childData[childKeyEnd]['listTextArray'];
      const endResultData = endResult ? [...endResult] : initialTextAreaArray;

      // 移除就欄位資料
      const [removed] = startResultData.splice(source.index, 1);
      // 添加自新欄位
      endResultData.splice(destination.index, 0, removed);

      const startPayLoad = {
        nodeKey: nodeKey,
        childKey: childKey,
        elements: { listTextArray: startResultData },
      };
      dispatch(editFormChildElement(startPayLoad));

      const endPayLoad = {
        nodeKey: nodeKey,
        childKey: childKeyEnd,
        elements: { listTextArray: endResultData },
      };
      dispatch(editFormChildElement(endPayLoad));
    }
  };

  // determining if its diff col or same col for row movement
  const handleRowMove: DragDropProps = (source, destination) => {
    if (source.droppableId !== destination.droppableId) {
      moveRowDifferentColumn(source, destination);
    } else {
      moveRowSameColumn(source, destination);
    }
  };

  // move columns
  const handleColumnMove: DragDropProps = (source, destination) => {
    const elementKeyArray = Object.keys(childData);
    const [remove] = elementKeyArray.splice(source.index, 1);
    elementKeyArray.splice(destination.index, 0, remove);

    const payload: ChangePositionChildPayload = {
      nodeKey: nodeKey,
      childrenPositionArray: elementKeyArray,
    };
    dispatch(changeFormChildElement(payload));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === 'all-columns') {
      handleColumnMove(source, destination);
    } else {
      handleRowMove(source, destination);
    }
  };

  const handleDragStart = (event: any) => {
    // the destination and source colIndex will be the same for start
    const eventElement = event.draggableId;
    if (eventElement !== undefined) {
      const childKeyValue = eventElement.split('-')[0];
      const childKeyIndexValue = eventElement.split('-')[1];
      setChildKey(childKeyValue);
      setChildKeyIndex(childKeyIndexValue);
    }
  };
  return { handleDragStart, handleDragEnd };
};

export default useDragDropHandle;

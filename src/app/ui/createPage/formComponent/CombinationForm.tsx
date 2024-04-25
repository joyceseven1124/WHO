'use client';
import { useAppDispatch, useAppSelector, useAppStore } from '@/src/lib/RThooks';
import {
  ChangePositionPayload,
  changeFormElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useRef } from 'react';
import PortfolioEditCardList from './list/PortfolioEditCardList'; // @preserve

export default function CombinationForm() {
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
  }

  const formList = useAppSelector(selectFormData);
  const onDragEnd = (event: any) => {
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    const elementKeyArray = Object.keys(formList);

    let elementArray = {};

    // 從source.index剪下被拖曳的元素
    const [remove] = elementKeyArray.splice(source.index, 1);

    //在destination.index位置貼上被拖曳的元素
    elementKeyArray.splice(destination.index, 0, remove);

    elementKeyArray.map((key: string) => {
      (elementArray as { [key: string]: any })[key] = formList[key];
    });
    const payload: ChangePositionPayload = {
      elementKeyArray: elementArray,
    };
    dispatch(changeFormElement(payload));
  };

  const formListRender = Object.keys(formList).map(
    (key: string, index: number) => {
      const CurrentElement = formList[key];
      const ComponentToRender =
        CurrentElement.componentType === 'PortfolioEditCardList'
          ? PortfolioEditCardList
          : null;
      if (ComponentToRender) {
        return (
          <fieldset key={key} className={key}>
            <Draggable draggableId={key} index={index} key={key}>
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <ComponentToRender nodeKey={key} />
                </div>
              )}
            </Draggable>
          </fieldset>
        );
      } else {
        return null;
      }
    }
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="blog-form-drop-id">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {formListRender}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

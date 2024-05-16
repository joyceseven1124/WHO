'use client';
import { useAppDispatch, useAppSelector, useAppStore } from '@/src/lib/RThooks';
import {
  ChangePositionPayload,
  changeFormElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useRef, useState } from 'react';
import CollapseListButton from './button/CollapseListButton';
import BannerEditCardList from './list/BannerEditCardList';
import BaseInformationList from './list/BaseInformationList';
import ListLayout from './list/ListLayout';
import ListPointerBoard from './list/ListPointerBoard';
import PortfolioEditCardList from './list/PortfolioEditCardList'; // @preserve
import StringCardList from './list/StringCardList';
import TimeLineEditList from './list/TimeLineEditList';

export default function CombinationForm() {
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const initialized = useRef(false);
  const [collapseStatus, setCollapseStatus] = useState(false);
  // 怕多次渲染
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
      let ComponentToRender: any;
      switch (CurrentElement.componentType) {
        case 'PortfolioEditCardList':
          ComponentToRender = PortfolioEditCardList;
          break;
        case 'ListPoints':
          ComponentToRender = ListPointerBoard;
          break;
        case 'TimeLineEdit':
          ComponentToRender = TimeLineEditList;
          break;

        case 'BannerEditCardList':
          ComponentToRender = BannerEditCardList;
          break;

        case 'StringCard':
          ComponentToRender = StringCardList;
          break;

        default:
          ComponentToRender = null;
      }

      if (ComponentToRender) {
        return (
          <fieldset key={key} className={key}>
            <Draggable
              draggableId={key}
              index={index}
              key={key}
              isDragDisabled={!collapseStatus}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <ListLayout nodeKey={key} collapseStatus={collapseStatus}>
                    <ComponentToRender />
                  </ListLayout>
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
    <div>
      <div className="my-10">
        <BaseInformationList />
      </div>
      <div className="mb-5 mt-5 flex w-full justify-end">
        <CollapseListButton
          collapseStatus={collapseStatus}
          setCollapseStatus={setCollapseStatus}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blog-form-drop-id">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {formListRender}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

import ListPointColumn from '@/src/app/ui/createPage/formComponent/smallElement/listPointDrop/ListPointColumn';
import { useAppSelector } from '@/src/lib/RThooks';
import { selectFormData } from '@/src/lib/feature/formDataSlice';
import useDragDropHandle from '@/src/lib/hooks/uselistPointerDragAndDrop';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useContext } from 'react';
import { ListPointerBoardStyle } from '../../../ComponentStyle';

export default function ListPointerBoard() {
  const data = useAppSelector(selectFormData);
  const nodeKey = useContext(NodeKeyContext);
  const childData = data[nodeKey]['children'];
  const { handleDragEnd, handleDragStart } = useDragDropHandle();
  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <ListPointerBoardStyle
            id={`list-board-${nodeKey}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {childData &&
              Object.keys(childData).map((key: string, index: number) => (
                <ChildKeyContext.Provider value={key} key={key}>
                  <ListPointColumn columnId={key} columnIndex={index} />
                </ChildKeyContext.Provider>
              ))}

            {provided.placeholder}
          </ListPointerBoardStyle>
        )}
      </Droppable>
    </DragDropContext>
  );
}

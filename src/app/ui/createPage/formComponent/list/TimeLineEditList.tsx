import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/context';
import {
  addFormChildElement,
  selectFormData,
} from '@/src/lib/feature/formDataSlice';
import { useContext } from 'react';
import ButtonCva from '../../../ButtonCva';
import TimeLineEdit from '../smallElement/TimeLineEdit';

export default function TimeLineEditList() {
  const data = useAppSelector(selectFormData);
  const nodeKey = useContext(NodeKeyContext);
  const childData = data[nodeKey]['children'];
  const dispatch = useAppDispatch();
  return (
    <div>
      {childData &&
        Object.keys(childData).map((key: string, index: number) => (
          <ChildKeyContext.Provider value={key} key={key}>
            <TimeLineEdit key={key} />
          </ChildKeyContext.Provider>
        ))}
      <div className="flex w-full flex-col items-center justify-center">
        <div className="h-20 border-l border-dotted border-black"></div>
        <div
          onClick={() => {
            dispatch(
              addFormChildElement({
                nodeKey: nodeKey,
                childKey: `${Date.now()}`,
              })
            );
          }}
        >
          <ButtonCva type="button" className="text-black" size={'sm'}>
            新增節點
          </ButtonCva>
        </div>
      </div>
    </div>
  );
}

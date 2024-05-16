import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import { selectFormData } from '@/src/lib/feature/formDataSlice';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import { useContext } from 'react';
import StringCard from '../card/StringCard';

export default function StringCardList() {
  const data = useAppSelector(selectFormData);
  const nodeKey = useContext(NodeKeyContext);
  const childData = data[nodeKey]['children'];
  const dispatch = useAppDispatch();
  return (
    <>
      {childData &&
        Object.keys(childData).map((key: string, index: number) => (
          <ChildKeyContext.Provider value={key} key={key}>
            <StringCard key={key} />
          </ChildKeyContext.Provider>
        ))}
    </>
  );
}

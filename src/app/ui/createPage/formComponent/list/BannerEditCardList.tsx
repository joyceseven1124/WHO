import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import { selectFormData } from '@/src/lib/feature/formDataSlice';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import { useContext } from 'react';
import BannerEditCard from '../card/BannerEditCard';

export default function BannerEditCardList() {
  const data = useAppSelector(selectFormData);
  const nodeKey = useContext(NodeKeyContext);
  const childData = data[nodeKey]['children'];
  const dispatch = useAppDispatch();
  return (
    <>
      {childData &&
        Object.keys(childData).map((key: string, index: number) => (
          <ChildKeyContext.Provider value={key} key={key}>
            <BannerEditCard key={key} />
          </ChildKeyContext.Provider>
        ))}
    </>
  );
}

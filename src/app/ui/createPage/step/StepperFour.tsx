import { Theme } from '@/src/app/theme';
import PortfolioCard from '@/src/app/ui/viewPage/PortfolioCard';
import { useAppSelector } from '@/src/lib/RThooks';
import { whoFormAction } from '@/src/lib/actions/whoFormAction';
import {
  ComponentStructure,
  FormElement,
  selectFormData,
  selectSelfInformation,
} from '@/src/lib/feature/formDataSlice';
import { useFormState } from 'react-dom';
import CombineDataView from '../../viewPage/CombineDataView';

export default function StepperFour() {
  const initialState = { message: '', errors: {}, success: false };
  const [stateMsg, dispatch] = useFormState(whoFormAction, initialState);

  const formList = useAppSelector(selectFormData);
  const selfFormList = useAppSelector(selectSelfInformation);
  const formDataObject = {
    formData: formList,
    selfInformation: selfFormList,
  };
  const keysList = Object.keys(formList);
  let newFormList: { [nodeKey: string]: ComponentStructure } = {};
  const formListArray = keysList.map((nodeKey: string, index: number) => {
    const childrenItems = Object.keys(formList[nodeKey]['children']);
    let newChildList: { [childKey: string]: FormElement } = {};
    const childArray = childrenItems.map(
      (childKey: string, childIndex: number) => {
        const childItem = {
          ...formList[nodeKey]['children'][childKey],
          position: childIndex,
        };
        newChildList[childKey] = childItem;
      }
    );

    const nodeItem = {
      ...formList[nodeKey],
      componentPosition: index,
      children: newChildList,
    };
    newFormList[nodeKey] = nodeItem;
  });
  return (
    <>
      <form action={dispatch} id="whoFormJson">
        <input
          type="hidden"
          name="formJsonData"
          value={JSON.stringify({
            formData: newFormList,
            selfInformation: selfFormList,
          })}
        />
      </form>
      <CombineDataView allData={formDataObject} />
    </>
  );
}

import { Theme } from '@/src/app/theme';
import PortfolioCard from '@/src/app/ui/viewPage/PortfolioCard';
import { useAppSelector } from '@/src/lib/RThooks';
import { whoFormAction } from '@/src/lib/actions/whoFormAction';
import {
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
  console.log(
    '進資料庫前的排序，',
    JSON.stringify({
      formData: formList,
      selfInformation: selfFormList,
    })
  );
  return (
    <>
      <form action={dispatch} id="whoFormJson">
        <input
          type="hidden"
          name="formJsonData"
          value={JSON.stringify({
            formData: formList,
            selfInformation: selfFormList,
          })}
        />
      </form>
      <CombineDataView allData={formDataObject} />
    </>
  );
}

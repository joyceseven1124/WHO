import CombinationForm from '@/src/app/ui/createPage/formComponent/CombinationForm';
import EditFormButtonsGroup from '@/src/app/ui/createPage/formComponent/EditFormButtonsGroup';
import BannerEditCard from '../formComponent/card/BannerEditCard';

export default function StepperThree() {
  return (
    <>
      <div>
        <CombinationForm />
      </div>
      {/* <BannerEditCard /> */}
      <EditFormButtonsGroup />
    </>
  );
}

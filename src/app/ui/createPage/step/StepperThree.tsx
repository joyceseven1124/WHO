import CombinationForm from '@/src/app/ui/createPage/formComponent/CombinationForm';
import EditFormButtonsGroup from '@/src/app/ui/createPage/formComponent/EditFormButtonsGroup';
export default function StepperThree() {
  return (
    <>
      <form>
        <CombinationForm />
        <button>Cancel</button>
        <button>SAVE</button>
      </form>
      <EditFormButtonsGroup />
    </>
  );
}

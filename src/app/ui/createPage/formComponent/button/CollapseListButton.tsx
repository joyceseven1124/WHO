import ButtonCva from '@/src/app/ui/ButtonCva';
import { Dispatch, SetStateAction, useState } from 'react';

export default function CollapseListButton({
  collapseStatus,
  setCollapseStatus,
}: {
  collapseStatus: boolean;
  setCollapseStatus: Dispatch<SetStateAction<boolean>>;
}) {
  const [buttonText, setButtonText] = useState('順序調整');
  const handleCollapseAdjust = () => {
    setCollapseStatus(!collapseStatus);
    if (collapseStatus) {
      setButtonText('順序調整');
    } else {
      setButtonText('展開編輯');
    }
  };

  return (
    <ButtonCva
      intent={'secondary'}
      onClick={handleCollapseAdjust}
      type="button"
    >
      {buttonText}
    </ButtonCva>
  );
}

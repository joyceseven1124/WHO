import { ScissorsIcon } from '@heroicons/react/24/outline';
import IconButton from '@mui/material/IconButton';
import { Dispatch, SetStateAction } from 'react';

export default function EditPictureButton({
  iconTailwindColor,
  setCrop,
}: {
  iconTailwindColor?: string;
  setCrop: Dispatch<SetStateAction<boolean>>;
}) {
  const controlEditPictureDialog = () => {
    setCrop(true);
  };
  return (
    <IconButton
      aria-label="edit"
      title="edit"
      onClick={controlEditPictureDialog}
    >
      <ScissorsIcon
        className={`h-[18px] w-[18px] ${iconTailwindColor ? iconTailwindColor : 'text-gray-500'}`}
      />
    </IconButton>
  );
}

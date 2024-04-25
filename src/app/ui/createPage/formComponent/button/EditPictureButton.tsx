import CropIcon from '@mui/icons-material/Crop';
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
      aria-label="edit crop"
      title="edit"
      onClick={controlEditPictureDialog}
    >
      <CropIcon
        className={`h-[18px] w-[18px] ${iconTailwindColor ? iconTailwindColor : 'text-gray-500'}`}
      />
    </IconButton>
  );
}

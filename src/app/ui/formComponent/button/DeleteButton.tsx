import { TrashIcon } from '@heroicons/react/24/outline';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function DeleteButton({
  iconTailwindColor,
}: {
  iconTailwindColor?: string;
}) {
  return (
    <IconButton aria-label="delete" title="delete">
      <TrashIcon
        className={`h-[18px] w-[18px] ${iconTailwindColor ? iconTailwindColor : 'text-gray-500'}`}
        title="delete"
      />
    </IconButton>
  );
}

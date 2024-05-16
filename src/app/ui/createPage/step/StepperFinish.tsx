import { useAppSelector } from '@/src/lib/RThooks';
import { selectCardData } from '@/src/lib/feature/businessCardDataSlice';
import Link from 'next/link';
import ButtonCva from '../../ButtonCva';

export default function StepperFinish() {
  let href = '/';
  const data = useAppSelector(selectCardData);
  if (data && data.id) {
    href = '/WhoForm/view/' + data.id;
  }
  return (
    <div className="mt-10 flex h-96 flex-col items-center justify-center">
      <h2 className="text-xl text-black">
        完成所有表單填寫，去看看最終成果吧！！
      </h2>
      <Link href={href} className="mt-5 text-black">
        <ButtonCva>Go to my blog</ButtonCva>
      </Link>
    </div>
  );
}

import Pagination from '@/src/app/ui/Pagination';
import {
  fetchCountPageRootCard,
  websocketRootCard,
} from '@/src/lib/handleData/fetchContentData';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import ButtonCva from './ui/ButtonCva';
import BusinessCardList from './ui/frontPage/BusinessCardList';
import { CardSkeletonGroup } from './ui/skeletons';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPagesResult = await fetchCountPageRootCard();
  const cardDataWebsocket = await websocketRootCard(currentPage, query);

  let totalPages: number = 1;
  if (typeof totalPagesResult === 'number') {
    totalPages = totalPagesResult;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-24">
      <div className="mb-20 flex max-w-[1200px] flex-col items-center gap-x-10 sm:flex-row">
        <Image
          src="/frontPage-Banner.jpg"
          width={150}
          height={150}
          alt="website home page banner"
          className="h-auto w-6/12 border"
        ></Image>

        <div className="flex w-6/12 flex-col items-center gap-y-3 text-black">
          <p className="mb-5 text-center text-3xl">Hi，你是誰？</p>
          <p className="">
            當你願意分享你的學經歷時，你不僅能夠讓更多人看到你的成就和努力，也可以啟發他人、建立連結，甚至可能為自己帶來新的機會和成長。因此，不妨勇敢地分享你的故事，讓更多人受益，一同成長。
          </p>

          <Link href="/WhoForm/create" className="mt-5 h-fit">
            <ButtonCva intent={'secondary'} size={'lg'}>
              立馬體驗
            </ButtonCva>
          </Link>
        </div>
      </div>
      <Suspense key={query + currentPage} fallback={<CardSkeletonGroup />}>
        <BusinessCardList data={cardDataWebsocket} />
      </Suspense>

      <div className="mt-20">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}

import Pagination from '@/src/app/ui/Pagination';
import {
  fetchCountPageRootCard,
  websocketRootCard,
} from '@/src/lib/handleData';
import BusinessCardList from './ui/frontPage/BusinessCardList';

export default async function Home() {
  const totalPagesResult = await fetchCountPageRootCard();
  const cardDataWebsocket = await websocketRootCard();
  let totalPages: number = 1;

  if (typeof totalPagesResult === 'number') {
    totalPages = totalPagesResult;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BusinessCardList data={cardDataWebsocket} />
      <Pagination totalPages={totalPages} />
    </main>
  );
}

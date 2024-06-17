'use client';
import BusinessCardBook from '@/src/app/ui/businessCard/BusinessCardBook';
import BusinessCardFlip from '@/src/app/ui/businessCard/BusinessCardFlip';
import BusinessCardSlide from '@/src/app/ui/businessCard/BusinessCardSlide';
import { BusinessCardListProp } from '@/src/lib/definitions';
import { getRootCards } from '@/src/lib/handleData/webSocketCardData';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CardSkeletonGroup } from '../skeletons';
export default function BusinessCardList({
  dataParameter,
}: {
  dataParameter: { currentPage: number; query: string };
}) {
  const [data, setData] = useState<BusinessCardListProp[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const handleData = (rootCards: BusinessCardListProp[], error?: Error) => {
      setLoading(false);
      if (error) {
        setError(error);
      } else {
        setData(rootCards);
      }
    };

    const unsubscribe = getRootCards(
      dataParameter.currentPage,
      dataParameter.query,
      handleData
    );

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [dataParameter]);
  let renderElementList;
  if (data.length > 0) {
    renderElementList = data.map((element) => {
      let ComponentToRender;
      switch (element.cardType) {
        case 'BusinessCardBook':
          ComponentToRender = BusinessCardBook;
          break;
        case 'BusinessCardFlip':
          ComponentToRender = BusinessCardFlip;
          break;
        case 'BusinessCardSlide':
          ComponentToRender = BusinessCardSlide;
          break;
        default:
          ComponentToRender = null;
      }
      return (
        ComponentToRender && (
          <Link href={`/WhoForm/view/${element.id}`} key={element.id}>
            <ComponentToRender
              time={element.time}
              name={element.userName}
              work={element.work}
              description={element.description}
              userPhoto={element.userPhotoUrl}
              userPhotoAlt={element.userPhotoInformation}
              bgPhoto={element.userBgPhotoUrl || ''}
              bgPhotoAlt={element.userBgPhotoInformation || ''}
            />
          </Link>
        )
      );
    });
  }
  return (
    <>
      {loading ? (
        <CardSkeletonGroup />
      ) : (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 mdPlus:grid-cols-3 xl:grid-cols-4">
          {renderElementList}
        </div>
      )}
    </>
  );
}

import BusinessCardBook from '@/src/app/ui/businessCard/BusinessCardBook';
import BusinessCardFlip from '@/src/app/ui/businessCard/BusinessCardFlip';
import BusinessCardSlide from '@/src/app/ui/businessCard/BusinessCardSlide';
import { BusinessCardListProp } from '@/src/lib/definitions';
import Link from 'next/link';

export default function BusinessCardList({
  data,
}: {
  data: BusinessCardListProp[];
}) {
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
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 mdPlus:grid-cols-3 xl:grid-cols-4">
      {renderElementList}
    </div>
  );
}

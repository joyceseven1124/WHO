import BusinessCardBook from '@/src/app/ui/businessCard/BusinessCardBook';
import BusinessCardFlip from '@/src/app/ui/businessCard/BusinessCardFlip';
import BusinessCardSlide from '@/src/app/ui/businessCard/BusinessCardSlide';
import { BusinessCardListProp } from '@/src/lib/definitions';

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
          <ComponentToRender
            key={element.id}
            time={element.time}
            name={element.name}
            work={element.work}
            description={element.description}
            userPhoto={element.userPhoto.url}
            userPhotoAlt={encodeURIComponent(element.userPhoto.name)}
            bgPhoto={
              element.userBgPhoto
                ? encodeURIComponent(element.userBgPhoto.name)
                : null
            }
            bgPhotoAlt={
              element.userBgPhoto
                ? encodeURIComponent(element.userBgPhoto.name)
                : null
            }
          />
        )
      );
    });
  }
  return <div>{renderElementList}</div>;
}

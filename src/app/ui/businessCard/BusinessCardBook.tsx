import styles from '@/src/lib/cssModule/businessCard.module.scss';
import stylesBook from '@/src/lib/cssModule/businessCardBook.module.scss';
import { RootCardType } from '@/src/lib/definitions';
import Image from 'next/image';

export default function BusinessCardBook({
  time,
  name,
  work,
  description,
  userPhoto,
  userPhotoAlt,
}: RootCardType) {
  return (
    <div className={`${stylesBook.book} ${styles.cardWrapper}`}>
      <div className={`${styles.cardBackWrapper}`}>
        <p className={`${styles.cardBackWord}`}>Go to my blog</p>
        <p className={`${styles.cardTime}`}>{time}</p>
      </div>
      <div className={`${stylesBook.cover} ${styles.cardFrontWrapper}`}>
        <Image
          src={userPhoto}
          width={150}
          height={150}
          alt={userPhotoAlt}
          className={`${stylesBook.personImage}`}
        ></Image>
        <div>
          <p className={`${styles.cardName}`}>{name}</p>
          <p className={`${styles.cardWork}`}>{work}</p>
        </div>
        <p
          className={`${styles.cardDescription} ${stylesBook.personDescriptions}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

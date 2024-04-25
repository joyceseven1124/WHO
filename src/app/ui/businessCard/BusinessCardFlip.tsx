import styles from '@/src/lib/cssModule/businessCard.module.scss';
import stylesFlip from '@/src/lib/cssModule/businessCardFlip.module.scss';
import { RootCardType } from '@/src/lib/definitions';
import Image from 'next/image';

export default function BusinessCardFlip({
  time,
  name,
  work,
  description,
  userPhoto,
  userPhotoAlt,
  bgPhoto,
  bgPhotoAlt,
}: RootCardType) {
  return (
    <div className={`${styles.cardWrapper} ${stylesFlip.flipCard}`}>
      <div className={`${stylesFlip.flipCardInner}`}>
        <div
          className={`${styles.cardFrontWrapper} ${stylesFlip.flipCardFront}`}
        >
          {bgPhoto && (
            <Image
              src={bgPhoto}
              width={200}
              height={200}
              alt={bgPhotoAlt ? bgPhotoAlt : 'banner-image'}
              className={`${stylesFlip.cardBanner}`}
            />
          )}

          <Image
            src={userPhoto}
            width={150}
            height={150}
            alt={userPhotoAlt}
            className={`${stylesFlip.personImage}`}
          />

          <p className={`${styles.cardName}`}>{name}</p>
          <p className={`${styles.cardWork}`}>{work}</p>
          <p
            className={`${styles.cardDescription} ${stylesFlip.cardDescription}`}
          >
            {description}
          </p>
        </div>
        <div
          className={` ${styles.cardBackWrapper} ${stylesFlip.flipCardBack}`}
        >
          <p className={styles.cardBackWord}>Go to my blog</p>
          <p className={styles.cardTime}>{time}</p>
        </div>
      </div>
    </div>
  );
}

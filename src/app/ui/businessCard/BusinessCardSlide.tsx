import styles from '@/src/lib/cssModule/businessCard.module.scss';
import stylesSlide from '@/src/lib/cssModule/businessCardSLide.module.scss';
import { RootCardType } from '@/src/lib/definitions';
import Image from 'next/image';

export default function BusinessCardSlide({
  time,
  name,
  work,
  description,
  userPhoto,
  userPhotoAlt,
}: RootCardType) {
  return (
    <div className={`${stylesSlide.card} ${styles.cardWrapper}`}>
      <div className={`${stylesSlide.cardFront} ${styles.cardFrontWrapper}`}>
        <div className={`${stylesSlide.personImage}`}>
          <Image src={userPhoto} width={150} height={150} alt={userPhotoAlt} />
        </div>
        <p className={`${stylesSlide.cardTitle} ${styles.cardName}`}>{name}</p>
        <p className={`${styles.cardWork}`}>{work}</p>
        <p className={`${styles.cardDescription}`}>{description}</p>
      </div>
      <div className={`${stylesSlide.cardBack} ${styles.cardBackWrapper}`}>
        <p className={styles.cardBackWord}>Go to my blog</p>
        <p className={styles.cardTime}>{time}</p>
      </div>
    </div>
  );
}

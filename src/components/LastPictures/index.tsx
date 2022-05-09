import { usePicture } from '../../contexts/PictureContext';
import { PhotoCard } from '../PhotoCard';

import styles from './styles.module.css';

export function LastPictures() {
  const { pictureList } = usePicture();

  return (
    <aside className={styles.menu}>
      <h2>Last pictures</h2>
      <div className={styles.cards}>
        {pictureList.map((picture) => (
          <PhotoCard key={picture.id} picture={picture} />
        ))}
      </div>
    </aside>
  );
}

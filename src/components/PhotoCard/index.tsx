import Image from 'next/image';

import { usePicture } from '../../contexts/PictureContext';

import { Picture } from '../../models/Picture';

import styles from './styles.module.css';

interface PhotoCardProps {
  picture: Picture;
}

export function PhotoCard({ picture }: PhotoCardProps) {
  const { removePicture } = usePicture();

  function downloadHandler() {
    const ancora = document.createElement('a');

    ancora.href = picture.src;
    ancora.download = picture.name;
    ancora.click();
  }

  function removeHandler() {
    const confirmation = confirm(`Deseja mesmo remover ${picture.name}?\nEssa ação não poderá ser desfeita!`);

    if (confirmation) removePicture(picture);
  }

  return (
    <div className={styles.card}>
      <div className={styles.image} style={{ backgroundImage: `url(${picture.src})` }}></div>
      <div className={styles.info}>
        <div className={styles.title}>
          <h3>{picture.name}</h3>
        </div>
        <div className={styles.options}>
          <button onClick={downloadHandler}>Download</button>

          <button onClick={removeHandler}>Excluir</button>
        </div>
      </div>
    </div>
  );
}

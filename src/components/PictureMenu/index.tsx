import { useEffect, useRef } from 'react';

import { usePicture } from '../../contexts/PictureContext';

import { Picture } from '../../models/Picture';

import styles from './styles.module.css';

export function PictureMenu() {
  const { getVideoStream, takePicture, addPictureToList } = usePicture();

  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      getVideoStream(stream);
      if (video.current) video.current.srcObject = stream;
    });
  }, []);

  function clickHandler() {
    if (video.current) {
      const pictureURL = takePicture(video.current);
      const pictureName = prompt('Digite o nome da foto:');

      if (!pictureURL) return;

      const picture = new Picture(pictureName, pictureURL);

      addPictureToList(picture);
    }
  }

  return (
    <main className={styles.main}>
      <video muted autoPlay ref={video}></video>
      <div className={styles.buttonBox}>
        <button onClick={clickHandler}>Take picture</button>
      </div>
    </main>
  );
}

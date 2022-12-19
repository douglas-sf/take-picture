import { Camera, CheckCircle, X } from 'phosphor-react';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { getDefaultPictureName } from '../helpers/defaultPictureName';
import { takePhoto } from '../helpers/takePicture';
import { usePictures } from '../hooks/usePictures';
import { Modal } from './Modal';

export function MainContent() {
  const { addPicture } = usePictures();

  const [videoIsAvailable, setVideoIsAvailable] = useState(false);
  const [currentImage, setCurrentImage] = useState<Blob | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);

  function videoIsLoaded() {
    setVideoIsAvailable(true);
  }

  async function takePictureHandle() {
    if (videoRef.current) {
      const blob = await takePhoto(videoRef.current, 'image/png');

      setCurrentImage(blob);
      openModal();
    }
  }

  function submitHandler(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const filename = name.trim() || getDefaultPictureName();

    if (currentImage) {
      const fileName = filename.trim().endsWith('.png') ? filename : `${filename}.png`;

      const picture = {
        id: crypto.randomUUID(),
        file: new File([currentImage], fileName),
      };

      addPicture(picture);
    }
    closeModal();
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setCurrentImage(null);
    setName('');
  }

  function changeName(ev: ChangeEvent<HTMLInputElement>) {
    setName(ev.target.value);
  }

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        alert('It was not possible to initialize your video device');
      }
    })();
  }, []);

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-4">
      <video className="scale-x-[-1]" ref={videoRef} autoPlay muted onLoadedMetadata={videoIsLoaded}></video>

      <button className="btn btn-success" disabled={!videoIsAvailable} onClick={takePictureHandle}>
        <Camera size={18} weight="bold" />
        Take Picture
      </button>

      {modalIsOpen && currentImage && (
        <Modal closeModal={closeModal}>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-green-600">Picture info:</h3>

            <div className="flex flex-col gap-2">
              <label htmlFor="file-name-input">Name:</label>
              <input
                id="file-name-input"
                className="h-10 px-3  bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-none placeholder:text-zinc-500 dark:placeholder:text-zinc-600 rounded outline-none ring-blue-600 ring-offset-2 ring-offset-zinc-100 dark:ring-offset-zinc-800 focus:ring-2"
                placeholder="Please enter the picture name"
                type="text"
                onChange={changeName}
                value={name}
                required
              />
            </div>

            <div className="mt-6 flex justify-end items-center gap-8">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                <X size={18} weight="bold" />
                Cancel
              </button>

              <button type="submit" className="btn btn-success" disabled={!currentImage || !name}>
                <CheckCircle size={18} weight="bold" />
                Confirm
              </button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  );
}

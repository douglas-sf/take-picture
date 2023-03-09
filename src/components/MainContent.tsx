import { Camera, Check, CheckCircle, X } from 'phosphor-react';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { getDefaultPictureName } from '../helpers/defaultPictureName';
import { takePhoto } from '../helpers/takePicture';
import { usePictures } from '../hooks/usePictures';
import { Modal } from './Modal';

export function MainContent() {
  const { addPicture } = usePictures();

  const [videoIsAvailable, setVideoIsAvailable] = useState(false);
  const [currentImage, setCurrentImage] = useState<Blob | null>(null);
  const [pictureNameModalIsOpen, setPictureNameModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [name, setName] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);

  const currentImageURL = currentImage ? URL.createObjectURL(currentImage) : null;

  function videoIsLoaded() {
    setVideoIsAvailable(true);
  }

  async function takePictureHandle() {
    if (videoRef.current) {
      const blob = await takePhoto(videoRef.current, 'image/png');

      setCurrentImage(blob);
    }
  }

  function clearCurrentImage() {
    URL.revokeObjectURL(currentImageURL!);
    setCurrentImage(null);
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
    closePictureNameModal();
  }

  function openPictureNameModal() {
    setPictureNameModalIsOpen(true);
  }

  function closePictureNameModal() {
    setPictureNameModalIsOpen(false);
    clearCurrentImage();
    setName('');
  }

  function openErrorModal() {
    setErrorModalIsOpen(true);
  }

  function closeErrorModal() {
    setErrorModalIsOpen(false);
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
        openErrorModal();
      }
    })();
  }, []);

  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-4">
      <div className={`flex flex-col justify-center items-center gap-8 ${!currentImageURL && 'hidden'}`}>
        <h2>Preview</h2>

        {currentImageURL && <img src={currentImageURL} alt="image-preview" />}

        <div className="flex gap-8">
          <button className="btn btn-success" onClick={openPictureNameModal}>
            <Check size={18} weight="bold" />
            Confirm
          </button>

          <button className="btn btn-danger" onClick={clearCurrentImage}>
            <X size={18} weight="bold" />
            Cancel
          </button>
        </div>
      </div>

      <div className={`flex flex-col justify-center items-center gap-8 ${currentImageURL && 'hidden'}`}>
        <video className="scale-x-[-1]" ref={videoRef} autoPlay muted onLoadedMetadata={videoIsLoaded}></video>

        <button className="btn btn-success" disabled={!videoIsAvailable} onClick={takePictureHandle}>
          <Camera size={18} weight="bold" />
          Take Picture
        </button>
      </div>

      {pictureNameModalIsOpen && currentImage && (
        <Modal closeModal={closePictureNameModal}>
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
              <button type="button" className="btn btn-secondary" onClick={closePictureNameModal}>
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

      {errorModalIsOpen && (
        <Modal closeModal={closeErrorModal}>
          <h2 className="text-2xl font-bold text-red-600">Error</h2>

          <p className="max-w-[400px] mt-6">
            It wasn't possible to initialize your camera device, please verify your camera connection or permission
          </p>

          <div className="mt-10 flex justify-end">
            <button className="btn btn-danger" onClick={closeErrorModal}>
              <X size={18} weight="bold" />
              Close
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}

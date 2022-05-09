import { createContext, ReactNode, useContext, useState } from 'react';

import { Picture } from '../models/Picture';

interface PictureContextData {
  stream: MediaStream | null;
  pictureList: Picture[];
  getVideoStream(stream: MediaStream): void;
  takePicture(videoElement: HTMLVideoElement): string | void;
  addPictureToList(picture: Picture): void;
  removePicture(picture: Picture): void;
}

interface PictureProviderProps {
  children: ReactNode;
}

const PictureContext = createContext({} as PictureContextData);

export function PictureProvider({ children }: PictureProviderProps) {
  const [stream, setStream] = useState<MediaStream>(null);
  const [pictureList, setPictureList] = useState<Picture[]>([]);

  function getVideoStream(stream: MediaStream) {
    setStream(stream);
  }

  function takePicture(videoElement: HTMLVideoElement) {
    if (!stream) return alert('Please give the camera permission');

    const { videoWidth: width, videoHeight: height } = videoElement;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    context.drawImage(videoElement, 0, 0, width, height);

    return canvas.toDataURL('image/jpeg');
  }

  function addPictureToList(picture: Picture) {
    setPictureList((currentList) => [...currentList, picture]);
  }

  function removePicture(picture: Picture) {
    const pictures = [...pictureList];
    const newPictureList = pictures.filter((item) => item.id !== picture.id);
    setPictureList(newPictureList);
  }

  return (
    <PictureContext.Provider
      value={{ stream, pictureList, getVideoStream, takePicture, addPictureToList, removePicture }}
    >
      {children}
    </PictureContext.Provider>
  );
}

export function usePicture() {
  return useContext(PictureContext);
}

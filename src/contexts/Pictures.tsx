import { createContext, ReactNode, useState } from 'react';

import { takePhoto } from '../helpers/takePicture';

export interface Picture {
  id: string;
  file: File;
}

interface PicturesContextData {
  pictures: Picture[];
  addPicture: (picture: Picture) => void;
  removePicture: (pictureId: string) => void;
}

interface PicturesProviderProps {
  children: ReactNode;
}

export const PicturesContext = createContext({} as PicturesContextData);

export function PicturesProvider({ children }: PicturesProviderProps) {
  const [pictures, setPictures] = useState<Picture[]>([]);

  function addPicture(picture: Picture) {
    setPictures((currentPictures) => [...currentPictures, picture]);
  }

  function removePicture(pictureId: string) {
    setPictures((currentPictures) => currentPictures.filter((picture) => picture.id !== pictureId));
  }

  return (
    <PicturesContext.Provider value={{ pictures, addPicture, removePicture }}>{children}</PicturesContext.Provider>
  );
}

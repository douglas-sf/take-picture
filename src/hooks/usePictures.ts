import { useContext } from 'react';

import { PicturesContext } from '../contexts/Pictures';

export function usePictures() {
  return useContext(PicturesContext);
}

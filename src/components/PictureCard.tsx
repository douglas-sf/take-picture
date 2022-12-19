import { useEffect, useState } from 'react';
import { Download, Trash, X } from 'phosphor-react';

import { Picture } from '../contexts/Pictures';
import { usePictures } from '../hooks/usePictures';
import { Modal } from './Modal';

interface PictureCardProps {
  image: Picture;
}

export function PictureCard({ image }: PictureCardProps) {
  const { removePicture } = usePictures();
  const [imageSrc, setImageSrc] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function removePictureHandle() {
    removePicture(image.id);
    closeModal();
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const url = URL.createObjectURL(image.file);

    setImageSrc(url);

    return () => {
      URL.revokeObjectURL(imageSrc);
    };
  }, []);

  return (
    <div className="p-2 flex gap-4 items-center border-b border-t border-zinc-300">
      <div
        className="w-[100px] h-[100px] bg-cover bg-center rounded-full"
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>

      <div className="flex-1 flex flex-col gap-4">
        <h3 className="text-xl text-center font-bold">{image.file.name}</h3>

        <div className="px-2 flex justify-between items-center">
          <a className="btn btn-primary" href={imageSrc} download={image.file.name}>
            <Download size={18} weight="bold" />
            Download
          </a>

          <button className="btn btn-danger" onClick={openModal}>
            <Trash size={18} weight="bold" />
            Delete
          </button>
        </div>
      </div>

      {modalIsOpen && (
        <Modal closeModal={closeModal}>
          <h2 className="text-3xl font-bold text-red-600">Attention!</h2>

          <h3 className="mt-4 text-xl">Are you sure that you want to delete the picture: {image.file.name}?</h3>

          <div className="mt-10 flex justify-end items-center gap-8">
            <button className="btn btn-secondary" onClick={closeModal}>
              <X size={18} weight="bold" />
              Cancel
            </button>

            <button className="btn btn-danger" onClick={removePictureHandle}>
              <Trash size={18} weight="bold" />
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

import { usePictures } from '../hooks/usePictures';
import { PictureCard } from './PictureCard';

export function AsideMenu() {
  const { pictures } = usePictures();

  return (
    <aside className="w-1/3 max-w-[400px] py-3 flex flex-col gap-4 border-r border-blue-600">
      <h2 className="text-2xl font-bold text-green-500 text-center">Pictures</h2>

      <div className="flex flex-col gap-4">
        {pictures.map((picture) => (
          <PictureCard key={picture.id} image={picture} />
        ))}
      </div>
    </aside>
  );
}

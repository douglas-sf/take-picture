import { AsideMenu } from './components/AsideMenu';
import { MainContent } from './components/MainContent';
import { MainHeader } from './components/MainHeader';
import { PicturesProvider } from './contexts/Pictures';

export function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <MainHeader />

      <div className="flex flex-1">
        <PicturesProvider>
          <AsideMenu />
          <MainContent />
        </PicturesProvider>
      </div>
    </div>
  );
}

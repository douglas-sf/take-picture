import { DarkModeButton } from './DarkModeButton';

export function MainHeader() {
  return (
    <header className="p-4 border-b border-blue-600 flex justify-center items-center relative ">
      <h1 className="text-3xl font-bold text-blue-600">Take Picture</h1>

      <div className="absolute right-6">
        <DarkModeButton />
      </div>
    </header>
  );
}

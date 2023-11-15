import { TopBar } from "./top-bar";

interface MainPageProps {
  children: React.ReactNode;
}

export const MainPage = ({ children }: MainPageProps) => {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
};

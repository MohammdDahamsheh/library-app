import { CarouselBook } from "./components/CarouselBook";
import { ExploerTopBooks } from "./components/ExploerTopBooks";
import { Heros } from "./components/Heros";
import { LibraryService } from "./components/LibraryService";

export const HomePage = () => {
  return (
    <>
      <ExploerTopBooks />
      <CarouselBook />
      <Heros />
      <LibraryService />
    </>
  );
};

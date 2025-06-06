import { NavBar } from "./components/NavBar/NavBar";
import MovieCard from "./components/MovieCard";
import { FavoritesProvider } from "./context/FavoritesContext";

export const App = () => {
  return (
    <FavoritesProvider>
      <div>
        <NavBar />
        <MovieCard />
      </div>
    </FavoritesProvider>
  );
};


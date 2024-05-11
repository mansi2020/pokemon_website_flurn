import "./App.css";
import PokemonDetails from "./Component/PokemonDetails/PokemonDetails";
import { ContextProvider } from "./Context/Context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonList from "./Component/PokemonList/PokemonList";
import PokemonCompare from "./Component/PokemonCompare/PokemonCompare";
import Bookmark from "./Component/Bookmark/Bookmark";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PokemonList />,
    },
    {
      path: "/detail/:name",
      element: <PokemonDetails />,
    },
    {
      path: "/pokemoncompare",
      element: <PokemonCompare />,
    },
    {
      path: "/bookmark",
      element: <Bookmark />,
    },
  ]);
  return (
    <div className="App">
      <ContextProvider>
        <RouterProvider router={router}>
          <PokemonList />
        </RouterProvider>
      </ContextProvider>
    </div>
  );
}

export default App;

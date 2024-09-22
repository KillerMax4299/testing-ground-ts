import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes/Route";
import Home from "@/pages/Home";
import { useEffect, useState } from "react";

function App() {
  const [dark, setDark] = useState(true);

  function changeTheme() {
    setDark(!dark);
  }
  useEffect(() => {
    dark
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [dark]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home dark={dark} changeTheme={changeTheme} />}
        />
        {routes.map((route) => (
          <Route path={route.path} element={<route.Component />} />
        ))}
      </Routes>
    </>
  );
}

export default App;

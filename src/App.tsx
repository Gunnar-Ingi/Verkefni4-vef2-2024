import { Routes, Route } from "react-router-dom";

import './App.css';
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout/Layout";
import { Teams } from "./pages/Teams";
import { Team } from "./pages/Team";
import { Games } from "./pages/Games";
import { Game } from "./pages/Game";
import { AddTeam } from "./pages/AddTeam";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="addteam" element={<AddTeam />} />
          <Route path="games" element={<Games />} />
          <Route path="games/:id" element={<Game  />} />
          <Route path="teams/:id" element={<Team  />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

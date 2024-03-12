import {useRoutes} from "react-router-dom"
import { Index } from "./router/Index"
function App() {
  const Router = useRoutes(Index())
  return Router
}

export default App

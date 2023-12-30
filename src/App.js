import "./App.css";
import MainContainer from "./components.js/MainContainer";
import NavMenu from "./components.js/NavMenu";
import { SideMenu } from "./components.js/SideMenu";

function App() {
  return (
    <div className="flex ">
      <div className="w-1/4">
        <SideMenu />
      </div>
      <div className="flex-1">
        <MainContainer />
      </div>
      <div className="w-1/4">
        <NavMenu />
      </div>
    </div>
  );
}

export default App;

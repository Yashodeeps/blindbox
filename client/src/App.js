import { Provider } from "react-redux";
import "./App.css";
import MainContainer from "./components.js/MainContainer";
import NavMenu from "./components.js/NavMenu";
import { SideMenu } from "./components.js/SideMenu";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <div className="flex ">
        <div className="w-1/4">
          <SideMenu />
        </div>
        <div className="flex-1">
          <MainContainer />
        </div>
        <div className="w-1/3">
          <NavMenu />
        </div>
      </div>
    </Provider>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home/home';
import Signup from './pages/Signup/signup';
import Login from './pages/Login/login';
import React from 'react';
import Error from './pages/404/404'
import Accaunt from './pages/Account/accaunt';
import Activity from './pages/Activity/activity';
import Settings from './pages/Settings/settings';
import Achievement from "./pages/Achievement/achievement";
import Community from "./pages/Community/community";
import Share from "./pages/Share/share";
import Notifications from "./pages/Notifications/notifications";
import ElecWaste from "./pages/ElecWaste/elecwaste";
import PlastWaste from "./pages/PlastWaste/plastwaste";
import SolidWaste from "./pages/SolidWaste/solidwaste";
import RecycleWaste from "./pages/RecycleWaste/recyclewaste";
import Help from "./pages/Help/help";
import Privacy from "./pages/Privacy/privacy";
import OrganicWaste from "./pages/OrganicWaste/organicwaste";
import Language from "./pages/Language/language";

class App extends React.Component {

  render() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/sign-up" Component={Signup}/>
          <Route exact path="/" Component={Login}/>
          <Route exact path="/home" Component={Home}/>
          <Route exact path="/activity" Component={Activity}/>
          <Route path="*" Component={Error}/>
          <Route path='/accaunt-settings' Component={Accaunt}/>
          <Route path='/settings' Component={Settings}/>
          <Route path='/achievement' Component={Achievement}/>
          <Route path='/community' Component={Community}/>
          <Route path='/share' Component={Share}/>
          <Route path="/notifications" Component={Notifications}/>
          <Route path="/elecwaste" Component={ElecWaste}/>
          <Route path="/organicwaste" Component={OrganicWaste}/>
          <Route path="/plastwaste" Component={PlastWaste}/>
          <Route path="/solidwaste" Component={SolidWaste}/>
          <Route path="/glasswaste" Component={RecycleWaste}/>
          <Route path="/help" Component={Help}/>
          <Route path="/privacy" Component={Privacy}/>
          <Route path="/language" Component={Language}/>
        </Routes>
      </Router>
    </div>
  );
}
}

export default App;

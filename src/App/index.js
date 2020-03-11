import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "../Home";
import Youtube from "../Youtube";
import Vimeo from "../Vimeo";
import Soundcloud from "../Soundcloud";
import Siteimprove from "../Siteimprove";


// APP
function App() {
	
	// App View
  return(
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/youtube" component={Youtube} />
			<Route exact path="/vimeo" component={Vimeo} />
			<Route exact path="/soundcloud" component={Soundcloud} />
			<Route exact path="/siteimprove" component={Siteimprove} />
    </Router>
  )
	
}

export default App; 
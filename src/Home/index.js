import React from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams} from "react-router-dom";

// HOME
function Home(){
  
	// Home View
  return(
    <div>
      <h1>Home</h1>
		  <nav>
		  	<Link to="/youtube">Youtube</Link>
				<Link to="/vimeo">Vimeo</Link>
				<Link to="/soundcloud">Soundcloud</Link> 
			</nav>
    </div>
  )
	
}

export default Home;
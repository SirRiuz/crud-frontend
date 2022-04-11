

import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from "./screens/home";




class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <BrowserRouter>
        <Switch>

          <Route exact path={'/'} component={Home}/>

        </Switch>
      </BrowserRouter>
    )
  }

}


export default App
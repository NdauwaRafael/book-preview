import React, { useEffect } from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import Routes from "../routes";


const Pages = () => {

  useEffect(() => {
    document.title = 'Welcome | Books';
  });
  return (
        <Router>
            <div className="container">
              <Routes />
            </div>
        </Router>
  )
}

export default Pages;
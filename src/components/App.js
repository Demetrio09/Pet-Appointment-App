import React, { Component } from "react";
import "../css/App.css";

import AddAppointments from "./AddAppointments";
import ListAppointments from "./ListAppointments";
import SearchAppointments from "./SearchAppointments";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
    };
  }

  componentDidMount() {
    fetch("./data.json").then((res) => {
      res.json().then((res) => {
        const apts = res.map((item) => {
          return item;
        });
        this.setState({
          myAppointments: apts,
        });
      });
    });
  }

  render() {
    return (
      <main classNamepage="page br-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;

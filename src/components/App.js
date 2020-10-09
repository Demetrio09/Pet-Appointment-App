import React, { Component } from "react";
import "../css/App.css";

import AddAppointments from "./AddAppointments";
import ListAppointments from "./ListAppointments";
import SearchAppointments from "./SearchAppointments";

import { without } from "loadsh";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      formDisplay: false,
      lastIndex: 0,
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.handleToggleForm = this.handleToggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
  }

  addAppointment(apt) {
    let tempApt = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApt.unshift(apt);
    this.setState({
      myAppointments: tempApt,
      lastIndex: this.state.lastIndex + 1,
    });
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts,
    });
  }

  handleToggleForm() {
    this.setState({ formDisplay: !this.state.formDisplay });
  }

  componentDidMount() {
    fetch("./data.json").then((res) => {
      res.json().then((res) => {
        const apts = res.map((item) => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
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
      <main className="page br-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  handleToggleForm={this.handleToggleForm}
                  addAppointment={this.addAppointment}
                />
                <SearchAppointments />
                <ListAppointments
                  appointments={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;

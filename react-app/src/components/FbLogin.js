import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

export default class FbLogin extends Component {

  state = {
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  responseFacebook = response => {
    if (response.status === "unknown") {
      return
    }
    this.setState({
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
    this.props.onLogin(this.state)
  };


  render() {
    return <div>
    <h3>Please log in with your facebook account:</h3>
    <br />
    <FacebookLogin
      appId="394446275517679"
      autoLoad={true}
      fields="name,email,picture"
      callback={this.responseFacebook}
      />
      </div>;
  }
}
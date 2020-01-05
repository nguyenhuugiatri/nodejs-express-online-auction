import React, { Component } from "react";

class Home extends Component {
  render() {
    const user = JSON.parse(sessionStorage.getItem("user")).user;
    return (
      <main role="main" className="m-5">
        <h1>Welcome {user.name} !</h1>
        <p className="lead">
          This is admin dashboard to manage data of Online Auction website
        </p>
        <p>If you is not a admin. Please go to <a href="http://localhost:3000/">Online Auction</a> for bidding or selling</p>
      </main>
    );
  }
}

export default Home;

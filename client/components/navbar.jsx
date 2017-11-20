import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Nav extends Component {
  render() {
    return (
      <div className="navbar">
        <nav className="teal">
          <div className="nav-wrapper">
            <a href="" className="">Hello-books</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <div className="navitems">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/profile">{this.props.link1}</a></li>
                <li><a href="/dashboard">{this.props.link2}</a></li>
                <li><a href="/logout">{this.props.link3}</a></li>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { render } from 'react-dom';

// class Nav extends Component {
//   render() {
//     const { isAuthenticated } = this.props.auth;
//     const userLinks = (
//       <ul id="nav-mobile" className="right hide-on-med-and-down">
//         <li><a href="/">Home</a></li>
//         <li><a href="">Logout</a></li>
//       </ul>
//     );
//     const guestLinks = (
//       <ul id="nav-mobile" className="right hide-on-med-and-down">
//         <li><a href="/">Signin</a></li>
//         <li><a href="">Signup</a></li>
//       </ul>
//     );
//     return (
//       <div>
//         <nav className="teal">
//           <div className="nav-wrapper">
//             <a href="" className="">Hello-books</a>
//             <ul id="nav-mobile" className="right hide-on-med-and-down">
//               { isAuthenticated ? userLinks : guestLinks }
//             </ul>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }
// Nav.propTypes = {
//   users: React.propTypes.object.isRequired
// };

// function mapStateToProps(state) {
//   return {
//     auth: state.auth
//   };
// }

// export default Nav;


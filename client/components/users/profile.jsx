import React, { Component } from 'react';
import { Link } from 'react-router';
import { Col, Input, Button, SideNav, SideNavItem } from 'react-materialize';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <SideNav
          trigger={ <Button>View Full Profile</Button> }
          options={{ closeOnClick: true }}
        >
          <SideNavItem
            userView
            user={{
              // background: 'img/office.jpg',
              image: 'img/yuna.jpg',
              name: 'John Doe',
              email: 'jdandturk@gmail.com'
            }}
          />
          <SideNavItem href="#!icon" icon="cloud">First Link With Icon</SideNavItem>
          <SideNavItem href="#!second">Second Link</SideNavItem>
          <SideNavItem divider />
          <SideNavItem subheader>Subheader</SideNavItem>
          <SideNavItem waves href="#!third">Third Link With Waves</SideNavItem>
        </SideNav>
      </div>
    );
  }
}

import * as React from 'react';
import { Menu , Grid, Form, Checkbox, Button, Container } from 'semantic-ui-react';
import './settings.css';


export const Settings = () => {

  let [activeItem, setActiveItem] = React.useState("")
  let [horizontalBar, sethorizontalBar] = React.useState("vertical");


   window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 661px)").matches) {
      sethorizontalBar("vertical")
    } else {
      sethorizontalBar("horizontal")
    } 
});
 

  return (
    <div style={{marginTop: '50px'}}>
    <Container style={{marginTop: '50px'}}>
    <Grid style={{border: '1px solid #e4e4e4'}}>
    <Grid.Row>
      <Grid.Column className="sideBarColumn">
      <Menu className={horizontalBar}>
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={() => setActiveItem("profile")}
        >
          Profile
        </Menu.Item>

        <Menu.Item
          name='account'
          active={activeItem === 'account'}
          onClick={() => setActiveItem("account")}
        >
          Account
        </Menu.Item>
        <Menu.Item
          name='email'
          active={activeItem === 'email'}
          onClick={() => setActiveItem("email")}
        >
          Email 
        </Menu.Item>
        <Menu.Item
          name='plan'
          active={activeItem === 'plan'}
          onClick={() => setActiveItem("plan")}
        >
          Plan 
        </Menu.Item>
        <Menu.Item
          name='files'
          active={activeItem === 'files'}
          onClick={() => setActiveItem("files")}
        >
          Files
        </Menu.Item>
        <Menu.Item
          name='security'
          active={activeItem === 'security'}
          onClick={() => setActiveItem("security")}
        >
          Security
        </Menu.Item>
        <Menu.Item
          name='notifications'
          active={activeItem === 'notifications'}
          onClick={() => setActiveItem("notifications")}
        >
          Notifications
        </Menu.Item>


      </Menu>
      </Grid.Column>
      <Grid.Column className="rightSideForm">
      <Form size='tiny'>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Container>
    </div>
  );
};

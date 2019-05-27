import * as React from 'react';
import { Menu, Grid, Form, Button, Container, TextArea, Divider, Segment, Progress, Icon, Card } from 'semantic-ui-react';
import './settings.css';


export const Settings = () => {

  let [activeItem, setActiveItem] = React.useState("profile")
  let [horizontalBar, setHorizontalBar] = React.useState("vertical");

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 661px)").matches) {
      setHorizontalBar("vertical")
    } else {
      setHorizontalBar("horizontal")
    }
  });


  return (
    <div style={{ marginTop: '50px' }}>
      <Container style={{ marginTop: '50px' }}>
        <Grid style={{ border: '1px solid #e4e4e4' }}>
          <Grid.Row>
            <Grid.Column className="sideBarColumn">
              <Menu className={horizontalBar}>
                <Menu.Item  style={{ backgroundColor: '#252839', color: 'white' }}>
                  Settings
                </Menu.Item>
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
                  name='storage'
                  active={activeItem === 'storage'}
                  onClick={() => setActiveItem("storage")}
                >
                  Storage
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
            <Grid columns={2} relaxed='very' className="rightSideForm" style={{ display: activeItem == "profile" ? 'block' : 'none', paddingTop: '0', width: '100%!important' }}>
              <Grid.Column style={{width: '70%'}}>
              <Form size='tiny'>
                  <Form.Field>
                    <label>Name Surname</label>
                    <input placeholder='Name Surname' />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' />
                  </Form.Field>
                  <Form.Field>
                    <label>About</label>
                    <TextArea placeholder='Tell us more' />
                  </Form.Field>
                  <Button type='submit'>Save</Button>
                </Form>
              </Grid.Column>
              <Grid.Column style={{width: '30%'}}>
                <Card image='https://avatars0.githubusercontent.com/u/24634440?s=460&v=4' header='Ömer Şahin' meta='@somer5'/>
                <Button>Edit Image</Button>
              </Grid.Column>
            </Grid>
  
            <Grid.Column className="rightSideForm" style={{ display: activeItem == "account" ? 'block' : 'none', paddingTop: '0' }}>
              <Form size='tiny'>

                <Form.Field>
                  <label>Old Password</label>
                  <input placeholder='Old Password' />
                </Form.Field>
                <Form.Field>
                  <label>New Password</label>
                  <input placeholder='New Password' />
                </Form.Field>
                <Form.Field>
                  <label>Confirm New Password</label>
                  <input placeholder='Confirm New Password' />
                </Form.Field>
                <Button type='submit'>Save</Button>
              </Form>
              <Divider />
              <Form reply>
                <Button content='Delete My Gignox Account' labelPosition='left' icon='key' primary />
              </Form>
            </Grid.Column>

            <Grid.Column className="rightSideForm" style={{ display: activeItem == "storage" ? 'block' : 'none', paddingTop: '40px' }}>
              <Segment>
                <Progress percent={50} attached='top' color='blue' />
                <Icon name="angle right" />Shared Files (1 GB)
                   <Icon name="angle right" />Unused Space (2 GB)
             </Segment>
              <Segment style={{ border: 'none' }}>
                <Form reply>
                  <Button content='Upgrade Storage' icon='level up alternate' secondary />
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

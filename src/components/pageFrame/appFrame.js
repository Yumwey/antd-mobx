import React, { Component } from 'react'
import logo from './logo.svg'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { observer  } from 'mobx-react'
import './App.css'

import {
  Link,
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import notFound from '../errorPage/notFound'

const { Header, Content, Footer, Sider } = Layout;


const SubMenu = Menu.SubMenu;

@observer(['stores'])
class AppFrame extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  componentDidMount() {
    console.log('props', this.props);
  }
  render() {
    let props = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">滴滴优点TOB项目</div>
          <Menu theme="dark" defaultSelectedKeys={[props.location.pathname]} mode="inline">
            <Menu.Item key="/home/test">
              <Icon type="pie-chart" />
              <Link to='/home/test'><span>HOME</span></Link>  
            </Menu.Item>
            <Menu.Item key="/home/more">
              <Icon type="desktop" />
              <Link to={`/home/more`}><span>MORE</span></Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3"><Link to='/more'><span>MORE</span></Link></Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 'calc(100vh - 160px)' }}>
              <Switch>
                {props.routes.map((childRoute, index) => (<Route 
                      key={index}
                      path={childRoute.path}
                      render={ props => (<childRoute.component {...props} />) }
                    />)
                  )}
                <Route component={notFound}></Route>
                </Switch>
              </div>
            </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppFrame;

import React, { Component } from 'react'
import logo from './logo.svg'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { observer  } from 'mobx-react'
import './App.scss'
import NProgressComponent from '@components/NProgress/NProgress'

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
    console.log('--',props)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">滴滴优点TOB项目</div>
          <Menu theme="dark" defaultSelectedKeys={[props.location.pathname]} mode="inline">
            <Menu.Item key="/test">
              <Icon type="pie-chart" />
              <span>
                <Link className="router__Link" to='/test'>列表模块案例</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="/more">
              <Icon type="desktop" />
              <span>
                <Link className="router__Link" to='/more'><span>详细新增案例</span></Link>
              </span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>基本组件类</span></span>}
            >
              <Menu.Item key="3"><Link to='/more'><span>按钮</span></Link></Menu.Item>
              <Menu.Item key="4">交互组件</Menu.Item>
              <Menu.Item key="5">操作组件</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>表单组</span></span>}
            >
              <Menu.Item key="6">验证表单</Menu.Item>
              <Menu.Item key="8">多功能表单</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>
                <Link className="router__Link" to='/404'>404 or ERROR</Link>  
              </span>
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
                <NProgressComponent location={props.location.pathname}>
                  <Switch>
                    {props.routes.map((childRoute, index) => (<Route 
                          key={index}
                          path={childRoute.path}
                          render={ props => (<childRoute.component {...props} />) }
                        />)
                      )}
                    <Route component={notFound}></Route>
                  </Switch>
                </NProgressComponent>
              </div>
            </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppFrame;

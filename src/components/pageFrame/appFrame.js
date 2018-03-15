import React, { Component } from 'react'
import logo from './logo.svg'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Popover, Button } from 'antd'
import { observer  } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import './App.scss'
import NProgressComponent from '@components/NProgress/NProgress'
import NavTabComponent  from '@components/navTab/navTab'
import stores from '../../stores'

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

@observer
class AppFrame extends React.Component {
  componentDidMount () {
    this.setBreadcrumbs()
    this.divHeight = document.querySelector('.content').clientHeight - 366
    stores.homeStore.setClilentHeight(this.divHeight);
    window.onresize = () => {
      this.divHeight = document.querySelector('.content').clientHeight - 366
      stores.homeStore.setClilentHeight(this.divHeight);
    }
  }
  componentDidUpdate (prevProps,prevState) {
    let props = this.props
    if (props.location.pathname !== prevProps.location.pathname) {
      this.setBreadcrumbs ()
    }
  }
  setBreadcrumbs () {
    let props = this.props
    let routeName
    
    routeName = props.routes.filter(item => item.path === props.location.pathname)
    stores.homeStore.updateBreadcrumbs('', routeName.length ? routeName[0].name : '' )
  }
  render() {
    let props = this.props
    let homeStore = stores.homeStore
    console.log('props', props)
    return (
      <Layout className="h__min_100vh">
        <Sider
          trigger={null}
          collapsible
          collapsed={homeStore.collapsed}
        >
          <div className="logo"> {homeStore.collapsed ? '🐒':'滴滴优点TOB项目'}</div>
          <Menu theme="dark" defaultSelectedKeys={[props.location.pathname]} selectedKeys={[props.location.pathname]}  mode="inline">
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
          <Header className="header b__fff p__0" >
            <div className="header__toggle" onClick={ e => homeStore.toggle()}>
              { !homeStore.collapsed ? <Icon type="menu-fold" /> : <Icon type="menu-unfold" />}
            </div>
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item>系统名称</Breadcrumb.Item>
                {homeStore.breadcrumbs.map((item, i)=> {
                  return (<Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>)
                })}
              </Breadcrumb>
              <div className="header__user">
               <Popover placement="bottomRight"
                       content={(
                         <div>
                          <div className="header__user--drop--avator">
                                <Avatar size="large" icon="user" />
                          </div>
                          <div className="header__user--drop-info">
                            <p>Hello, 超级管理员 <br />已登录，100小时!</p>
                            <Button type="danger">退出登录</Button>
                          </div>
                        </div>
                        )
                       }
                       trigger="click" >
                <Avatar size="small" style={{backgroundColor: 'red'}} className="cursor__pointer">B</Avatar>
                <span className="header__user--name cursor__pointer">超级管理员</span>
              </Popover>
            </div>
          </Header>
          <NavTabComponent menu={props.location} routes={props.routes} />
            <Content className="content">
              <div className="content__main">
                <NProgressComponent location={props.location.pathname}>
                  <Switch>
                    {props.routes.map((childRoute, index) => (<Route 
                          key={index}
                          path={childRoute.path}
                          render={ props => (<childRoute.component name={childRoute.name} {...props} />) }
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

AppFrame.propTypes = {
  routes: PropTypes.array
}

export default AppFrame;

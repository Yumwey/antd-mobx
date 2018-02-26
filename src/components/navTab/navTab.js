/*
    name: tab导航切换组件
    auth: yangw
    data: 2018.2.26
    ---------   History ------
    2018.2.26 增加组件
*/

import React from 'react'
import PropTypes from 'prop-types'
import './navTab.scss'
import classnames from 'classnames'
import { observer  } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import {
    Link
  } from 'react-router-dom'

@observer
class NavTabComponent extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    componentWillMount () {
        let menu, props = this.props
        menu = {
            title: this.getPathName(props.routes),
            path: props.menu.pathname,
            active: true
        } 
        homeStore.setNavTabs('add', menu)
    }
    componentDidMount () {

    }
    componentDidUpdate (prevProps, prevState) {
        let  {menu} = this.props
        if (prevProps.menu.pathname !== menu.pathname) {
            this.setNewNavTab(menu.pathname)
        }
    }
    getPathName (paths) {
        let pathname = this.props.menu.pathname
        let name
        paths.forEach (item => {
            if (item.path === pathname) {
                name = item.name
            } else {
               if (item.routes && item.routes.length && !name) {
                   this.getPathName(item.routes)
               }else{
                   return;
               }
            }
        })
        return name
    }
    setNewNavTab (pathname) {
        let navTabs = getSnapshot(homeStore.navTabs)
        let isExsit, exsitArr, newMenu
        exsitArr = navTabs.filter( item => item.path === pathname )
        isExsit = Boolean(exsitArr.length)
        if (isExsit) {
            homeStore.setNavTabsActive(exsitArr[0])
        } else {
            newMenu = {
                title: this.getPathName(this.props.routes),
                active: true,
                path: pathname
            }
            homeStore.setNavTabsActive(newMenu)
            homeStore.setNavTabs('add', newMenu)
        }

    }
    deleteNav (e, item) {
        e.stopPropagation()
        if (getSnapshot(homeStore.navTabs).length === 1) return;
        if (item.active) {
            this.context.router.history.push({
                pathname: getSnapshot(homeStore.navTabs)[getSnapshot(homeStore.navTabs).length-1].path
            })
        } 
        homeStore.setNavTabs('remove', item)
    }
    render () {
        let  menus = homeStore.navTabs
        return (
            <div className="navTab">
                <ul className="navTab__menus">
                    { menus.map((item,idx)=> {
                        let clsName = classnames('navTab__menus--menu', {active: item.active})
                        return (<li className={clsName} key={idx}>
                            <div>
                                <Link className="navTab__menus--Link" to={item.path} >{item.title}</Link>
                                <i className="udianfont udian-wushuju-" onClick={ (e) => this.deleteNav(e, item)}></i>
                            </div>
                        </li>)
                    })}
                </ul>
            </div>)
    }
}
import { homeStore } from '../../stores';

NavTabComponent.propTypes = {
    menu: PropTypes.object,
    routes: PropTypes.array
}

export default NavTabComponent
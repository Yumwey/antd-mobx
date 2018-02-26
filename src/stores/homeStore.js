
import { types } from 'mobx-state-tree'

const navModel = types.model('navModel', {
    title: types.string,
    path: types.string,
    active: types.boolean
})

const FrameModel = types.model('FrameModel', {
    collapsed: types.boolean,
    breadcrumbs: types.array(types.string),
    height: types.number,
    navTabs: types.array(navModel)
}).actions ( self => ({
    toggle () {
        self.collapsed = !self.collapsed
    },
    updateBreadcrumbs (basecrumb, breadcrumb) {
        self.breadcrumbs = [basecrumb, breadcrumb]
    },
    setClilentHeight (height) {
        self.height = height
    },
    setNavTabs (type, nav) {
        if (type === 'add') {
            self.navTabs.push(nav);
        } else {
            self.navTabs = self.navTabs.filter(item => item.path !== nav.path)
        }
    },
    setNavTabsActive (nav) {
        self.navTabs.forEach(item => {
            if ( item.path === nav.path) {
                item.active = true
            } else {
                item.active = false
            }
        })
    }
}))

const FrameStore = FrameModel.create({
    collapsed: false,
    breadcrumbs: [],
    height: 0,
    navTabs: []
})


export default FrameStore
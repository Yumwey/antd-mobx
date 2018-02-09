
import { types } from 'mobx-state-tree'

const FrameModel = types.model('FrameModel', {
    collapsed: types.boolean,
    breadcrumbs: types.array(types.string),
    height: types.number
}).actions ( self => ({
    toggle () {
        self.collapsed = !self.collapsed
    },
    updateBreadcrumbs (basecrumb, breadcrumb) {
        self.breadcrumbs = [basecrumb, breadcrumb]
    },
    setClilentHeight (height) {
        self.height = height
    }
}))

const FrameStore = FrameModel.create({
    collapsed: false,
    breadcrumbs: [],
    height: 0
})


export default FrameStore
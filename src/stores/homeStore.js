
import { types } from 'mobx-state-tree'

const FrameModel = types.model('FrameModel', {
    collapsed: types.boolean,
    breadcrumbs: types.array(types.string),
}).actions ( self => ({
    toggle () {
        self.collapsed = !self.collapsed
    },
    updateBreadcrumbs (basecrumb, breadcrumb) {
        self.breadcrumbs = [basecrumb, breadcrumb]
    }
}))

const FrameStore = FrameModel.create({
    collapsed: false,
    breadcrumbs: []
})


export default FrameStore
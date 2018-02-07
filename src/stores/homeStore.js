
import { types } from 'mobx-state-tree'

const baseTypes = types.model('baseTypes', {
    breadcrumb: types.string
})

const FrameModel = types.model('FrameModel', {
    collapsed: types.boolean,
    breadcrumbs: types.array(baseTypes),
}).actions ( self => ({
    toggle () {
        console.log('‘---self---', self)
        self.collapsed = !self.collapsed
    },
    updateBreadcrumbs (breadcrumb) {
        self.breadcrumbs.push({breadcrumb: breadcrumb})
    }
}))

const FrameStore = FrameModel.create({
    collapsed: false,
    breadcrumbs: []
})


export default FrameStore
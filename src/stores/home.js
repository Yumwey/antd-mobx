
import { types } from 'mobx-state-tree'

const FrameModel = types.model('FrameModel', {
    collapsed: types.boolean
}).actions ( self => ({
    toggle () {
        console.log('‘---self---', self)
        self.collapsed = !self.collapsed
    }
}))

const FrameStore = FrameModel.create('FrameStore', {
    collapsed: false
})

export default FrameStore
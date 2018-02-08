import { types } from 'mobx-state-tree'

const selectModel = types
    .model('selectModel', {
        id: types.string,
        name: types.string
    })

const testModel = types
    .model('testModel', {
    selectInfo: types.optional(selectModel,{ id:'', name:'线路信息'}),
    showModal: types.optional(types.boolean, false),
    showLoading: types.optional(types.boolean, false),
})
    .actions( self => ({
    setFilterVal (type, val) {
        self[type] = val
    },
    toggleModal () {
        self.showModal = !self.showModal
    },
    toggleLoading () {
        self.showLoading = !self.showLoading
    }
}))

const testStore = testModel.create()

export default testStore
  
  
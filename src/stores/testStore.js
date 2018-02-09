import { types } from 'mobx-state-tree'

const selectModel = types
    .model('selectModel', {
        id: types.string,
        name: types.string
    })
const tableItemModel = types
    .model({
        id: types.number,
        avatar_url: types.string,
        login: types.string,
        score: types.number,
        type: types.string,
        html_url: types.string,
        followers_url: types.string
    })
const tableDataModel = types
    .model('tableDataModel', {
        total_count: types.number,
        items: types.array(tableItemModel)
    })
const testModel = types
    .model('testModel', {
        selectInfo: types.optional(selectModel,{ id:'', name:'线路信息'}),
        showModal: types.optional(types.boolean, false),
        showLoading: types.optional(types.boolean, false),
        tableLoading: types.optional(types.boolean, false),
        tableData: types.optional(tableDataModel, {total_count: 0, items: []})
    })
    .actions( self => ({
        setFilterVal (type, val) {
            self[type] = val
        },
        toggleState (type) {
            self[type] = !self[type]
        },
        updateData (data) {
            self.tableData = data
        }
    }))

const testStore = testModel.create()

export default testStore
  
  
import { observable } from 'mobx'

class homeStore {
    @observable homeState = {
        collapsed: false,
    }
}

export default homeStore
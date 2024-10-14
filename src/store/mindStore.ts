import { defineStore } from 'pinia'

const mindStore = defineStore('mindStore', {
  state: () => {
    return {
      userInfo: null
    }
  },
  actions: {
    logout() {
      this.userInfo = null
    }
  }
})

export default mindStore

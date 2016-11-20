import * as superagent from 'superagent'
import {action, toJS} from 'mobx'
import storedObservable from './util/stored-observable'

const state = storedObservable('contact-list-state', {
  contacts: [],
  selectedId: null,
  selectedType: null,
  get selected () {
    const propName = this.selectedType + 's'
    const collection = this[propName]
    if (collection) {
      return collection[this.selectedId]
    }
    return null
  },
  @action selectNothing (type, obj) {
    state.selectedType = null
    state.selectedId = null
  },
  @action select (type, obj) {
    state.selectedType = type
    state.selectedId = obj.id
  },
  tags: [{
    name: 'random-user',
    id: 0
  }],
  pendingRequestCount: 0
})

export const createRandomContact = () => {
  state.pendingRequestCount++
  superagent
    .get('https://randomuser.me/api/')
    .set('Accept', 'application/json')
    .end(action('createRandomContact-callback', (error, results) => {
      state.pendingRequestCount--
      if (error) {
        console.error(error)
      } else {
        const contact = JSON.parse(results.text).results[0]
        contact.tags = [0]
        if (state.tags.length === 0) {
          state.tags.push({name: 'random-user', id: 0})
        }
        contact.autoSave = false
        state.contacts.push(contact)
      }
    }))
}

// Create random contacts if there are none
if (state.contacts.length === 0) {
  for (let i = 0; i < 3; i++) {
    createRandomContact()
  }
}

window.getStateJS = () => toJS(state)
window.state = state

export default state

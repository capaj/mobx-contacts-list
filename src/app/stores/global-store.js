import * as superagent from 'superagent'
import {autorunAsync, action} from 'mobx'
import storedObservable from '../util/stored-observable'

const state = storedObservable('contact-list-state', {
  contacts: [],
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
        contact.addTag('random-user')
        state.contacts.push(contact)
      }
    }))
}

export default state

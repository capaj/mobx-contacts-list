import React, {Component} from 'react'
import {observer} from 'mobx-react'

import List from 'material-ui/List'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'

import ContactEntryView from './contact-entry-view'
import state, {createRandomContact} from '../store'

@observer
export class ContactsOverview extends Component {
  render () {
    return <List>
      <RaisedButton label='Add Contact' primary onClick={() => createRandomContact()} style={{
        marginLeft: 12
      }} /> {state.pendingRequestCount > 0
        ? <RefreshIndicator size={40} left={10} top={0} status='loading' style={loaderStyle} />
        : null
      }
      {state.contacts.map((contact, index) => <ContactEntryView contact={contact} index={index} key={index} />)}
    </List>
  }
}

const loaderStyle = {
  position: 'relative',
  float: 'right',
  marginRight: 30
}

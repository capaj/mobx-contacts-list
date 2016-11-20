import React from 'react'
import {observer} from 'mobx-react'

import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import state from '../store'
import getDisplayName from '../util/get-display-name'

const ContactEntryView = ({contact, index}) => (
  <ListItem
    onClick={() => {
      state.select('contact', {
        id: index
      })
    }}
    className={`contact ${state.selected === contact ? 'selected' : ''}`}
  >
    <Avatar src={contact.picture.thumbnail} className='avatar' />
    {getDisplayName(contact.name)}
    <br />
    {contact.tags.map(tagId => {
      const tag = state.tags.find((tag) => tag.id === tagId)
      return <input
        key={tag.id}
        onClick={(e) => {
          e.stopPropagation()
          state.select('tag', tag)
        }}
        type='button'
        value={tag.name}
        className='tag-preview'
      />
    })}
  </ListItem>
)

export default observer(ContactEntryView)

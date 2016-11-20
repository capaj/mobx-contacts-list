import React from 'react'
import {observer} from 'mobx-react'

import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import state from '../stores/global-store'

const TagOverviewEntry = observer(({tag}) => <ListItem
  primaryText={tag.name}
  onClick={() => state.select('tag', tag)}
  className={state.selected === tag ? 'selected' : null}
/>)

export const TagsOverview = observer(() =>
  <List>
    <Subheader>Tags</Subheader>
    {state.tags.map(tag => <TagOverviewEntry key={tag.id} tag={tag} />)}
  </List>
)

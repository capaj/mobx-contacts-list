import React from 'react'
import {observer} from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {deepOrange500} from 'material-ui/styles/colors'
import DevTools from 'mobx-react-devtools'
import {Card, CardTitle} from 'material-ui/Card'
import state from '../store'

import {ContactsOverview} from './contacts-overview'
import {TagsOverview} from './tags-overview'
import {ContactView} from './contact-view'
import {TagView} from './tag-view'

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
})

@observer
class Main extends React.Component {

  render () {
    let content
    if (state.selectedType === 'contact') {
      content = <ContactView contact={state.selected} />
    } else if (state.selectedType === 'tag') {
      content = <TagView tag={state.selected} />
    } else {
      content = <span>"Please select a contact or tag"</span>
    }

    return <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <DevTools />
        <Card className='sidebar'>
          <CardTitle title='My Contacts' />
          <ContactsOverview />
          <TagsOverview />
        </Card>
        <div className='content'>
          {content}
        </div>
      </div>
    </MuiThemeProvider>
  }
}

export default Main

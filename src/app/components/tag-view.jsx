import React from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import state from '../store'

@observer
export class TagView extends React.Component {

  render () {
    const {tag} = this.props
    return <Card>
      <CardTitle
        title={`Tag ${tag.name}`}
        />
      <CardText>
        <TextField
          floatingLabelText='Tag name'
          value={tag.name}
          onChange={this.onChangeTagName}
          />
        <CardActions>
          <FlatButton label='Delete' onClick={this.onDelete} />
        </CardActions>
      </CardText>
    </Card>
  }

  @action onChangeTagName = (e) => {
    const {tag} = this.props
    tag.name = e.target.value
  }

  @action onDelete = () => {
    const {tag} = this.props
    state.selectNothing()
    state.contacts.forEach((contact) => {
      contact.tags.remove(tag.id)
    })
    state.tags.splice(state.tags.indexOf(tag), 1)
  }
}

import React from 'react'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import state from '../stores/global-store'
import getDisplayName from '../util/get-display-name'

@observer
export class ContactView extends React.Component {
  @observable firstNameValue
  @observable lastNameValue
  @observable autoSave
  @observable tagId = state.tags.length // AutoComplete has no reset api, abuse react keys..

  componentWillMount () {
    this.resetInputValues(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.resetInputValues(nextProps)
  }
  getAvailableTags () {
    return state.tags.filter(tag => this.props.contact.tags.indexOf(tag.id) === -1)
  }
  render () {
    const {contact} = this.props
    return <Card>
      <CardTitle
        title={getDisplayName(contact.name)}
        subtitle={contact.login.username}
        children={<span style={{ float: 'left', marginLeft: '43%' }}>
          Auto Save: <Toggle style={{ width: 'auto', float: 'right' }} defaultToggled={contact.autoSave} onToggle={this.onToggle} />
        </span>}
      />
      <CardText>
        <Avatar src={contact.picture.large} size={120} />
        <br />
        <TextField
          floatingLabelText='First name'
          value={this.firstNameValue}
          onChange={this.onChangeFirstName}
        />
        <TextField
          floatingLabelText='Last name'
          value={this.lastNameValue}
          onChange={this.onChangeLastName}
        />
        <br />
        <h2>Tags</h2>
        <p>{contact.tags.map((tagId) => {
          return state.tags.find((tag) => tag.id === tagId).name
        }).join(', ')}</p>
        <AutoComplete
          floatingLabelText='Add tag'
          key={this.tagId}
          dataSource={this.getAvailableTags().map((tag) => tag.name)}
          onNewRequest={this.onSelectTag}
        />

      </CardText>
      <CardActions>
        <FlatButton label='Delete' onClick={this.onDelete} />
        <FlatButton label='Cancel' onClick={this.onCancel} />
        <FlatButton label='Save' primary onClick={this.onSave} disabled={this.autoSave} />
      </CardActions>
    </Card>
  }

  @action onChangeFirstName = (e) => {
    this.firstNameValue = e.target.value
    this.autoSave && this.onSave()
  }

  @action onChangeLastName = (e) => {
    this.lastNameValue = e.target.value
    this.autoSave && this.onSave()
  }

  @action onToggle = (e, disabled) => {
    this.autoSave = disabled
    this.onSave()
  }

  @action onDelete = () => {
    state.contacts.remove(state.selected)
    state.selectNothing()
  }

  @action onSave = () => {
    const {contact} = this.props
    contact.name.first = this.firstNameValue
    contact.name.last = this.lastNameValue
    contact.autoSave = this.autoSave
  }

  @action onCancel = () => {
    this.resetInputValues(this.props)
  }

  @action onSelectTag = (value) => {
    const {contact} = this.props
    let tag = state.tags.find((tag) => tag.name === value)
    if (!tag) {
      tag = {name: value, id: state.tags.length}
      state.tags.push(tag)
    }
    contact.tags.push(tag.id)

    this.autoSave && this.onSave()
  }

  @action resetInputValues (props) {
    const {contact} = props

    this.firstNameValue = contact.name.first
    this.lastNameValue = contact.name.last
    this.autoSave = contact.autoSave
  }
}

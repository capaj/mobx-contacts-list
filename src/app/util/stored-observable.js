/* global localStorage */
import {observable, observe} from 'mobx'
import _ from 'lodash'

function storedObservable (key, defaultValue, debounce) {
  let fromStorage = localStorage.getItem(key)
  const defaultClone = _.cloneDeep(defaultValue)  // we don't want to modify the given object, because userscript might want to use the original object to reset the state back to default values some time later
  if (fromStorage) {
    _.merge(defaultClone, JSON.parse(fromStorage))
  }
  const obsVal = observable(defaultClone)
  observe(obsVal, () => {
    localStorage.setItem(key, JSON.stringify(obsVal))
  })
  return obsVal
}

export default storedObservable

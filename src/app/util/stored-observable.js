/* global localStorage */
import {observable, autorunAsync} from 'mobx'
import _ from 'lodash'

function storedObservable (key, defaultValue, debounce) {
  let fromStorage = localStorage.getItem(key)
  if (fromStorage) {
    _.merge(defaultValue, JSON.parse(fromStorage))
  }
  const obsVal = observable(defaultValue)
  autorunAsync(() => {
    localStorage.setItem(key, JSON.stringify(obsVal))
  }, 300)
  return obsVal
}

export default storedObservable

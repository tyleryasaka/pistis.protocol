import { Entity, store } from '@graphprotocol/graph-ts'
import {
  LinkAdded,
  LinkRemoved
} from './types/trustability/trust'

export function linkAdded(event: LinkAdded): void {
  let link = new Entity()

  link.setAddress('source', event.params.source)
  link.setAddress('target', event.params.target)

  let key = event.params.source.toHex() + event.params.target.toHex()

  link.setString('id', key)
  store.set('Link', key, link)
}

export function linkRemoved(event: LinkRemoved): void {

  let key = event.params.source.toHex() + event.params.target.toHex()

  store.remove('Link', key)
}

// @flow
import React from 'react'
import * as C from '../../constants/people'
import {action, storiesOf, createPropProvider} from '../../stories/storybook'
import FollowNotification, {type Props} from '.'
import moment from 'moment'

const provider = createPropProvider({
  Usernames: props => {
    const {usernames} = props
    const users = usernames.map(username => ({
      username,
      following: ['max', 'chrisnojima'].includes(username),
      you: false,
    }))
    return {
      ...props,
      users,
      onUsernameClicked: action('onUsernameClicked'),
    }
  },
})

const singleFollowProps1: Props = {
  type: 'notification',
  newFollows: [C.makeFollowedNotification({username: 'mmaxim'})],
  badged: true,
  notificationTime: new Date(),
  onClickUser: action('onClickUser'),
}

const singleFollowProps2: Props = {
  type: 'notification',
  newFollows: [C.makeFollowedNotification({username: 'max'})],
  badged: false,
  notificationTime: moment()
    .subtract(3, 'days')
    .toDate(),
  onClickUser: action('onClickUser'),
}

const multiFollowProps1: Props = {
  type: 'notification',
  newFollows: [
    C.makeFollowedNotification({username: 'max'}),
    C.makeFollowedNotification({username: 'mmaxim'}),
    C.makeFollowedNotification({username: 'chrisnojima'}),
  ],
  badged: true,
  notificationTime: moment()
    .subtract(3, 'weeks')
    .toDate(),
  numAdditional: 0,
  onClickUser: action('onClickUser'),
}

const multiFollowProps2: Props = {
  type: 'notification',
  newFollows: [
    C.makeFollowedNotification({username: 'max'}),
    C.makeFollowedNotification({username: 'mmaxim'}),
    C.makeFollowedNotification({username: 'chrisnojima'}),
    C.makeFollowedNotification({username: 'chris'}),
  ],
  badged: false,
  notificationTime: moment()
    .subtract(3, 'months')
    .toDate(),
  numAdditional: 5,
  onClickUser: action('onClickUser'),
}

const load = () => {
  storiesOf('People/Follow notification', module)
    .addDecorator(provider)
    .add('Someone followed you', () => <FollowNotification {...singleFollowProps1} />)
    .add('Someone you follow followed you', () => <FollowNotification {...singleFollowProps2} />)
    .add('A few people followed you', () => <FollowNotification {...multiFollowProps1} />)
    .add('Many people followed you', () => <FollowNotification {...multiFollowProps2} />)
}

export default load

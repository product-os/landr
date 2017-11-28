/* eslint-disable */
import React, { Component, PropTypes, Children } from 'react'
import EventLog from 'resin-event-log'
import isEmpty from 'lodash/isEmpty'
import capitalize from 'lodash/capitalize'
import { withRouter } from '@resin.io/react-static'

/*
usage:
<Tracker analytics=<analyticsObj> prefix='<repo name>' />
*/
class Tracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracker: {}
    }
  }

  componentDidMount() {
    if (isEmpty(this.state.tracker)) {
      const tracker = EventLog({
        ...{
          prefix: `${capitalize(this.props.prefix)} Website`
        },
        ...this.props.analytics
      })

      if (process.env.NODE_ENV === 'production') {
        tracker.start()
        tracker.page.visit({ url: window.location.pathname })

        this.props.history.listen(({ pathname }) => {
          tracker.page.visit({ url: pathname })
        })
      }

      this.setState({
        tracker
      })
    }
  }

  static childContextTypes = {
    tracker: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      tracker: this.state.tracker
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default withRouter(Tracker)

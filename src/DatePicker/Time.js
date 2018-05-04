import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../styles'
import TimeScroll from './TimeScroll'

class Time extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
    this.handleHourChange = this.handleChange.bind(this, 'hour')
    this.handleMinuteChange = this.handleChange.bind(this, 'minute')
    this.handleSecondChange = this.handleChange.bind(this, 'second')
    this.handleAMPMChange = this.handleChange.bind(this, 'ampm')
  }

  handleChange(type, val) {
    const { current, format } = this.props
    const date = new Date(current.getTime())
    let hours

    switch (type) {
      case 'hour':
        if (format.indexOf('h') >= 0 && date.getHours() >= 12) {
          date.setHours(val + 12)
        } else {
          date.setHours(val)
        }
        break
      case 'minute':
        date.setMinutes(val)
        break
      case 'second':
        date.setSeconds(val)
        break
      case 'ampm':
        hours = date.getHours()
        if (val === 1 && hours < 12) date.setHours(hours + 12)
        else if (val === 0 && hours >= 12) date.setHours(hours - 12)
        break
      default:
    }
    this.props.onChange(date, true)
  }

  render() {
    const { format, current } = this.props
    const className = datepickerClass('time-picker')

    let hours = current.getHours()
    if (format.indexOf('h') >= 0 && hours >= 12) {
      hours -= 12
    }

    return (
      <div className={className}>
        {
          format.indexOf('H') >= 0 &&
          <TimeScroll value={current.getHours()} total={24} onChange={this.handleHourChange} />
        }
        {
          format.indexOf('h') >= 0 &&
          <TimeScroll value={hours} total={12} onChange={this.handleHourChange} />
        }
        {
          format.indexOf('m') >= 0 &&
          <TimeScroll value={current.getMinutes()} onChange={this.handleMinuteChange} />
        }
        {
          format.indexOf('s') >= 0 &&
          <TimeScroll value={current.getSeconds()} onChange={this.handleSecondChange} />
        }
        {
          (/a|A/.test(format)) &&
          <TimeScroll
            value={current.getHours() >= 12 ? 1 : 0}
            total={2}
            ampm
            onChange={this.handleAMPMChange}
          />
        }
      </div>
    )
  }
}

Time.propTypes = {
  current: PropTypes.object,
  format: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Time

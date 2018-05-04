import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../styles'
import utils from './utils'
import Icon from './Icon'
import { getLocate } from './locate'
import Time from './Time'

class Day extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hover: null,
    }

    this.handleNextMonth = this.handleMonth.bind(this, 1)
    this.handlePrevMonth = this.handleMonth.bind(this, -1)
    this.handleNextYear = this.handleMonth.bind(this, 12)
    this.handlePrevYear = this.handleMonth.bind(this, -12)
    this.handleMonthMode = this.handleModeChange.bind(this, 'month')
    this.handleYearMode = this.handleModeChange.bind(this, 'year')
    this.handleWeekLeave = this.handleWeek.bind(this, null)
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }

  getDays() {
    const { current } = this.props
    if (utils.isSameMonth(this.cachedDate, current) && this.cachedDays) {
      return this.cachedDays
    }
    this.cachedDays = utils.getDaysOfMonth(current)
    this.cachedDate = current

    return this.cachedDays
  }

  handleDayClick(date) {
    const { current, type } = this.props
    if (type === 'week') {
      if (date.getDay() === 0) {
        date = utils.addDays(date, 1)
      }
      this.props.onChange(date, true, true)
    } else {
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        current.getHours(),
        current.getMinutes(),
        current.getSeconds(),
      )
      this.props.onChange(newDate, true, type !== 'datetime')
    }
  }

  handleTimeChange(time) {
    this.props.onChange(time, true)
  }

  handleWeek(hover) {
    this.setState({ hover })
  }

  handleMonth(month) {
    const { current, onChange } = this.props
    onChange(utils.addMonths(current, month))
  }

  handleModeChange(mode) {
    this.props.onModeChange(mode)
  }

  renderDay(date) {
    const {
      current, disabled, value, type,
    } = this.props
    const { hover } = this.state
    const isDisabled = disabled ? disabled(date) : false

    const classList = [
      current.getMonth() !== date.getMonth() && 'other-month',
      isDisabled && 'disabled',
    ]

    let hoverClass
    const hoverProps = {}
    if (type === 'week') {
      hoverProps.onMouseEnter = this.handleWeek.bind(this, date)
      hoverProps.onMouseLeave = this.handleWeekLeave
      if (utils.isSameWeek(date, value)) {
        hoverClass = datepickerClass(
          'active',
          date.getDay() === 0 && 'hover-start',
          date.getDay() === 6 && 'hover-end',
        )
      } else if (hover && utils.isSameWeek(date, hover)) {
        hoverClass = datepickerClass(
          'hover',
          date.getDay() === 0 && 'hover-start',
          date.getDay() === 6 && 'hover-end',
        )
      }
    } else {
      classList.push(utils.isSameDay(date, value) && 'active')
    }

    return (
      <div
        key={date.getTime()}
        className={hoverClass}
        onClick={isDisabled ? undefined : this.handleDayClick.bind(this, date)}
        {...hoverProps}
      >
        <span className={datepickerClass(...classList)}>{date.getDate()}</span>
      </div>
    )
  }

  renderTimepicker() {
    if (this.props.type !== 'datetime') return undefined

    let { format } = this.props
    const match = format.match(/[H|h].*/)
    // eslint-disable-next-line
    if (match) format = match[0]

    return (
      <div className={datepickerClass('datetime')}>
        <Time {...this.props} onChange={this.handleTimeChange} />
        <span>{utils.format(this.props.current, format)}</span>
      </div>
    )
  }

  render() {
    const { current } = this.props
    const days = this.getDays()

    return (
      <div className={datepickerClass('day-picker')}>
        <div className={datepickerClass('header')}>
          <Icon onClick={this.handlePrevYear} name="AngleDoubleLeft" />
          <Icon onClick={this.handlePrevMonth} name="AngleLeft" />

          <span className={datepickerClass('ym')}>
            <span onClick={this.handleYearMode}>{current.getFullYear()}</span>
            <span onClick={this.handleMonthMode}>
              {getLocate('monthValues.short')[current.getMonth()]}
            </span>
          </span>

          <Icon onClick={this.handleNextMonth} name="AngleRight" />
          <Icon onClick={this.handleNextYear} name="AngleDoubleRight" />
        </div>

        <div className={datepickerClass('week')}>
          { getLocate('weekdayValues.narrow').map(w => <span key={w}>{w}</span>) }
        </div>

        <div className={datepickerClass('list')}>
          {
            days.map(d => this.renderDay(d))
          }
        </div>

        { this.renderTimepicker() }
      </div>
    )
  }
}

Day.propTypes = {
  current: PropTypes.object.isRequired,
  disabled: PropTypes.func,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
}

export default Day

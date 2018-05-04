/**
 * cn - 选择时间
 *    -- 会根据 format 自动加载相应的选择列
 * en - Time Type
 */
import React from 'react'
import { DatePicker } from 'shineout'

const style = { width: 120, marginRight: 12 }

export default function () {
  return (
    <div>
      <DatePicker style={style} type="time" defaultValue={Date.now()} />
      <DatePicker style={style} type="time" format="HH:mm" defaultValue={Date.now()} />
      <DatePicker style={style} type="time" format="hh:mm a" defaultValue={Date.now()} />
    </div>
  )
}

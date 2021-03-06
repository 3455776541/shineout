/**
 * cn - 基本用法
 *    -- 基本的使用
 * en - Base
 *    -- Basic usage
 */
import React from 'react'
import { Tag } from 'shineout'

export default function () {
  return (
    <div>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag> sfweokwefk
      <Tag onClose={() => console.log('I am close')}>Tag 3</Tag>
    </div>
  )
}

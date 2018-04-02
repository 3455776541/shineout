/**
 * cn - 表头分组
 * en - Column group
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(4)
const name = (
  <span
    style={{
      background: 'red',
      display: 'block',
      lineHeight: '40px',
      color: '#fff',
    }}
  >
    Name
  </span>
)

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'First Name', render: 'firstName', group: [name, 'True Name'] },
  { title: 'Last Name', render: 'lastName', group: [name, 'True Name'] },
  { title: 'Nick Name', render: () => 'nickname', group: name },
  { title: 'Country', render: 'country' },
  { title: 'Office', render: 'office', group: 'Other' },
  { title: 'Position', render: 'position', group: 'Other' },
]

export default function () {
  return (
    <Table
      bordered
      keygen="id"
      columns={columns}
      data={data}
    />
  )
}

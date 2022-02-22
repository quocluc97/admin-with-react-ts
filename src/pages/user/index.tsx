import { Card, Table } from 'antd'
import React, { useState } from 'react'

function User() {
  const [dataSource, setDataSource] = useState([])
  
  return (
    <>
      <Card title="User">
        <Table
          columns={[
            {
              title: '#',
            },
            {
              title: 'Username',
              dataIndex: 'username',
            },
            {
              title: 'Display Name',
              dataIndex: 'displayName',
            },
            {
              title: 'Role',
              dataIndex: 'role',
            },
          ]}
          dataSource={dataSource}
        />
      </Card>
    </>
  )
}

export default User

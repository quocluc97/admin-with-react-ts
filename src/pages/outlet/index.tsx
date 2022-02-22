import { useLazyQuery } from '@apollo/client'
import { Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { processPathRoute } from '../../util/helper'
import { GET_LIST_OUTLET } from './graphql'
import { OutletQueryResult } from './interface'

function Outlet() {
  const location = useLocation()

  const [getListOutlet, { data, loading }] = useLazyQuery<OutletQueryResult>(
    GET_LIST_OUTLET,
  )
  useEffect(() => {
    getListOutlet()
  }, [])

  return (
    <>
      <Card title={processPathRoute(location.pathname)}>
        <Table
          loading={loading}
          columns={[
            {
              title: '#',
            },
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Code',
              dataIndex: 'code',
            },
            {
              title: 'Address',
              dataIndex: 'address',
            },
          ]}
          dataSource={data?.entities}
        />
      </Card>
    </>
  )
}

export default Outlet

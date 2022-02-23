import {
  FrownFilled,
  PlusCircleFilled,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useLazyQuery } from '@apollo/client'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  TablePaginationConfig,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ChannelItem,
  OutletFilterInput,
  QueryPaginationInput,
} from '../../interfaces'
import { useChannel, processPathRoute, useProvince } from '../../util/helper'
import { GET_LIST_OUTLET } from './graphql'
import {
  AddOutletForm,
  OutletQueryPaginationInput,
  OutletQueryResult,
} from './interface'

const { Option } = Select

function Outlet() {
  /**
   * Load danh sách outlet từ GraphQL
   */
  const [getListOutlet, { data, loading }] = useLazyQuery<OutletQueryResult>(
    GET_LIST_OUTLET,
  )

  /**
   * Phân trang trên table
   */
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  })

  /**
   * Query phân trang và fitler
   */
  const [queryPagination, setQueryPagination] = useState<
    OutletQueryPaginationInput
  >({})

  /**
   * Modal thêm outlet hiện hay ẩn
   */
  const [isAddOutletModalVisible, setIsAddOutletModalVisible] = useState(false)

  /**
   * Lấy danh sách channel
   */
  const listChannelData = useChannel()

  /**
   * Lấy danh sách province
   */
  const listProvinceData = useProvince()

  /**
   * Load data khi vào route này
   */
  useEffect(() => {
    getListOutlet()
  }, [])

  /**
   * Khi data thay đổi cập nhật lại phân trang cho table
   */
  useEffect(() => {
    setPagination({
      ...pagination,
      total: data?.outlets.count ?? 0,
    })
  }, [data])

  /**
   * Khi thay đổi trang phân trang hay filter thì load lại data từ server
   */
  useEffect(() => {
    getListOutlet({
      variables: {
        pagination: queryPagination,
      },
    })
  }, [queryPagination])

  /**
   * Form finish
   */
  const onFinish = (values: OutletFilterInput) => {
    setQueryPagination({
      where: [
        {
          code: {
            contains: values.code ?? '',
          },
          name: {
            contains: values.name ?? '',
          },
        },
      ],
      take: pagination.pageSize,
      skip: 0,
    })
    setPagination({
      ...pagination,
      current: 1,
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  /**
   * Hiển thị modal thêm Outlet khi nhấn vào nút thêm
   */
  const showAddOutletModal = () => {
    setIsAddOutletModalVisible(true)
  }
  /**
   * Khi nhấn OK trên modal thêm Outlet thì tắt modal và load lại data từ server
   */
  const handleOk = () => {
    setIsAddOutletModalVisible(false)
  }

  /**
   * Đóng modal thêm Outlet khi nhấn vào nút đóng
   */
  const handleCancel = (e: any) => {
    setIsAddOutletModalVisible(false)
  }

  /**
   * Submit form thêm Outlet
   */
  const handleSubmitFormAddOutlet = (values: AddOutletForm) => {
    console.log(values)
  }
  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        layout="vertical"
        className="mt-0 pt-0"
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Code" name="code">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Outlet name" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit" loading={loading}>
                <SearchOutlined />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="flex justify-between">
        <h3>List outlet</h3>
        <Button onClick={showAddOutletModal}>
          <PlusCircleOutlined />
          Add
        </Button>
      </div>

      <Table
        loading={loading}
        columns={[
          {
            title: '#',
            render: (text, record, index) => {
              return (
                ((pagination.current ?? 0) - 1) * (pagination.pageSize ?? 5) +
                index +
                1
              )
            },
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
        dataSource={data?.outlets?.entities}
        rowKey="id"
        pagination={pagination}
        onChange={(e) => {
          setPagination({
            ...pagination,
            current: e.current ?? 1,
            pageSize: e.pageSize ?? 5,
          })
          setQueryPagination({
            ...queryPagination,
            take: e.pageSize,
            skip: ((e.current ?? 1) - 1) * (e?.pageSize ?? 10),
          })
        }}
      />

      <Modal
        title="Add Outlet"
        visible={isAddOutletModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={true}
        maskClosable={false}
      >
        <Form layout="vertical" onFinish={handleSubmitFormAddOutlet}>
          <Form.Item label="Name" name="name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Code" name="code">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Channel" name="channel">
            <Select
              showArrow={true}
              showSearch={true}
              filterOption={(input: string, option: any) => {
                return (
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                )
              }}
            >
              {listChannelData?.channels.map((channel) => {
                return (
                  <Option value={channel.id} key={channel.id}>
                    {channel.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Province" name="province">
            <Select
              showArrow={true}
              showSearch={true}
              filterOption={(input: string, option: any) => {
                return (
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                )
              }}
            >
              {listProvinceData?.provinces.map((province) => {
                return (
                  <Option value={province.id} key={province.id}>
                    {province.name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input type="text" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Outlet

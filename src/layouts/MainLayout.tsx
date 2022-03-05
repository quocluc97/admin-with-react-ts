import { Layout, Menu, Modal } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DashboardOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import Avatar from 'antd/lib/avatar/avatar'
import Text from 'antd/lib/typography/Text'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth, useNotificationAlert } from '../App'
import { processPathRoute } from '../util/helper'
import { NotificationAlertType } from '../enum'

const { Header, Sider, Content } = Layout

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [modal, contextHolder] = Modal.useModal()
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  const auth = useAuth()
  const location = useLocation()
  const notificationAlert = useNotificationAlert()
  useEffect(() => {
    const alert = notificationAlert?.alert
    const config = {
      title: alert?.title,
      content: alert?.message,
    }
    switch (alert?.type) {
      case NotificationAlertType.SUCCESS:
        modal.success(config)
        break
      case NotificationAlertType.ERROR:
        modal.error(config)
        break
      case NotificationAlertType.INFO:
        modal.info(config)
        break
    }
  }, [notificationAlert.alert])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo p-3 align-middle text-center">
          <p className="text-white">
            {auth.user?.displayName}
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'pl-5',
                onClick: toggle,
              },
            )}
          </p>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/user">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>
            <Link to="/outlet">Outlets</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="d-flex justify-content-end align-items-center pl-3">
            <h3>{processPathRoute(location.pathname)}</h3>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '80vh',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      {contextHolder}
    </Layout>
  )
}

export default MainLayout

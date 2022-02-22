import { Button, Checkbox, Form, Input } from 'antd'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { Location } from 'history'
import { useEffect } from 'react'
import { getUserLogin } from '../util/localStorageHelper'
import { LoginResult, UserLogin } from '../interfaces'

function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location: Location = useLocation()
  const userLogin = getUserLogin()

  const onFinish = async (values: any) => {
    const request = await axios.post<LoginResult>(
      process.env.REACT_APP_DOMAIN + '/auth/login',
      {
        ...values,
        type: 'WEB',
      },
    )
    if (request.status === 200 && request?.data?.access_token) {
      const userLogin: UserLogin = {
        username: request?.data?.username,
        displayName: request?.data?.display_name,
        token: request?.data?.access_token,
        role: request?.data?.role,
      }
      auth.signin(userLogin, () => {
        navigate('/', { replace: true })
      })
    }
  }

  useEffect(() => {
    if (userLogin) {
      auth.signin(userLogin, () => {
        navigate('/', { replace: true })
      })
    }
  })

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  //TODO: add modal alert when location.state is not null

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{
        username: 'admin',
        password: '123@imark',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login

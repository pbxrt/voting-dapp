import { useState } from 'react'
import { Button, Empty, Form, Checkbox, Input } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
function Dashboard() {
  return (
    <div>
      <div className="pt-40">
        <Empty
          styles={{ image: { height: 200 } }}
          description={false}
        >
          <Button type="primary" icon={<UserAddOutlined />}>Register A Candidate</Button>
        </Empty>
      </div>
    </div>
  )
}

export default Dashboard

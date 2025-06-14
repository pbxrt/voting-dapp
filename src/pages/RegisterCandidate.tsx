import { useState, useRef, useEffect } from 'react'
import { Image, Typography, Table, Button, Empty, Form, Checkbox, Input } from 'antd';
import CreateModal from '@/components/CreateModal';

const { Title } = Typography;

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (_, { avatar }) => {
      return <Image src={avatar} width={100} />
    },
    width: 200
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
function Register() {
  const [dataSource, setDataSource] = useState([{ key: '1', avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' }]);
  const createModalRef = useRef(null);

  const onCreateNew = () => {
    createModalRef.current?.open('candidate');
  }

  return (
    <div className="px-8">
      <div>
        <div className="flex justify-between">
          <Title level={4}>Register Candidate</Title>
          <Button onClick={onCreateNew}>New Candidate</Button>
        </div>
        <Table dataSource={dataSource} columns={columns}>
        </Table>
      </div>

      <CreateModal ref={createModalRef} />
    </div>
  )
}

export default Register

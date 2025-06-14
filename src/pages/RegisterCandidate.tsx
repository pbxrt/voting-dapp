import { useState, useRef, useEffect } from 'react'
import { Image, Typography, Table, Button, Empty, Form, Checkbox, Input } from 'antd';
import CreateModal from '@/components/CreateModal';
import { getCandidates } from '@/contracts/Voting';

const { Title } = Typography;

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (_, { avatar }) => {
      return <Image src={`https://gateway.pinata.cloud/ipfs/${avatar}`} width={100} />
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
  const [dataSource, setDataSource] = useState([]);
  const createModalRef = useRef(null);

  const onCreateNew = () => {
    createModalRef.current?.open('candidate');
  }

  const refreshTable = async () => {
    const candidates = await getCandidates();
    setDataSource(candidates);
  }

  useEffect(() => {
    refreshTable();
  }, []);

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

      <CreateModal ref={createModalRef} refreshTable={refreshTable} />
    </div>
  )
}

export default Register

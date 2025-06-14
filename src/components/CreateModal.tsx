import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, InputNumber, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { setCandidate } from '@/contracts/Voting';

// Declaration of VITE_JWT in ImportMeta to resolve the error
declare global {
  interface ImportMeta {
    readonly env: Record<string, string>;
  }
}

export default function CreateModel({ ref, refreshTable }) { 
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  ref.current = {
    open(type) {
      if (type === 'candidate') {
        setTitle('Register Candidate');
      } else if (type === 'voter') {
        setTitle('Register Voter');
      }
      form.resetFields();
      setIsModalOpen(true);
    }
  };

  const handleOk = async () => {
    setIsLoading(true);
    
    try {
      const { avatar, name, age, address } = form.getFieldsValue(true);
      const cid = avatar?.[0].response.IpfsHash;
      
      console.log({
        cid,
        name,
        age,
        address
      });

      const tx = await setCandidate(address, name, age, cid);
      await tx.wait();
      setIsModalOpen(false);
      refreshTable();
    } catch (err) {
      console.log('>>>', err);
      messageApi.error(err.shortMessage);
    }
    setIsLoading(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
      open={isModalOpen}
      title={title}
      footer={
        <Button type="primary" onClick={handleOk} loading={isLoading}>
          Submit
        </Button>
      }
      onCancel={handleCancel}
    >
      {contextHolder}
      <div className="pt-6"></div>
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item label="Avatar" name="avatar" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload maxCount={1} action="https://api.pinata.cloud/pinning/pinFileToIPFS" listType="picture-card" headers={{ authorization: 'Bearer ' + import.meta.env.VITE_JWT }}>
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age">
          <InputNumber style={{width: '100%'}} />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
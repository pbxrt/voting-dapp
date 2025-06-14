import { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Upload  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// Declaration of VITE_JWT in ImportMeta to resolve the error
declare global {
  interface ImportMeta {
    readonly env: Record<string, string>;
  }
}

export default function CreateModel({ ref }) { 
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  ref.current = {
    open(type) {
      if (type === 'candidate') {
        setTitle('Register Candidate');
      } else if (type === 'voter') {
        setTitle('Register Voter');
      }
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    // setIsModalOpen(false);
    const { avatar, name, age, address } = form.getFieldsValue(true);
    const cid = avatar?.[0].response.data.cid;

    console.log({
      cid,
      name,
      age,
      address
    });
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
      open={isModalOpen}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item label="Avatar" name="avatar" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload maxCount={1} action="https://uploads.pinata.cloud/v3/files" listType="picture-card" headers={{ authorization: 'Bearer ' + import.meta.env.VITE_JWT }}>
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
          <InputNumber />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
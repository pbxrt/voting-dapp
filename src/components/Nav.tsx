import { useState, useEffect, use } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { useAccount } from '@/store/account';
import { Menu, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const items = [
  {
    label: 'Dashboard',
    key: 'dashboard',
  },
  {
    label: 'Register',
    key: 'register',
    children: [
      { label: 'Candidate', key: 'register/candidate' },
      { label: 'Voter', key: 'register/voter' }
    ]
  },
];

export default function Nav() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [ currentSelectedKey, setCurrentSelectedKey ] = useState(items[0].key);
  const onClickMenuItem = (menuItem) => {
    setCurrentSelectedKey(menuItem.key);
    navigate(menuItem.key);
  }

  const { account, setAccount } = useAccount();

  const connectWalletSilently = async () => {
    let accounts;
    if (window.ethereum) {
      accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }
  };

  const connectWalletManully = async () => {
    if (!window.ethereum) {
      messageApi.info('Please install MetaMask')
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // if (accounts.length > 0) {
      //   setAccount(accounts[0]);
      // } else {
      //   messageApi.info('No account found')
      // }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    connectWalletSilently();

    window.ethereum?.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(undefined)
      }
    });
  }, []);

  return (
    <>
      {contextHolder}
      <nav className="sticky top-0 flex items-center py-3 px-6">
        <Menu onClick={onClickMenuItem} style={{ borderBottom: 'none'}} selectedKeys={[currentSelectedKey]} mode="horizontal" items={items} />
        <div className="mr-auto"></div>
        { account ? (
          <Button icon={<UserOutlined />}>
            {account.slice(0,6)}.....{account.slice(-6)}
          </Button>
        ) : (
          <Button shape="round" onClick={connectWalletManully}>连接钱包</Button>
        )}
      </nav>
    </>
  )
}
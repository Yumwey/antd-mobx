import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import {find as _find}from 'lodash'
import stores, { testStore } from '../stores'
import { Input, Menu, Dropdown, Icon, Divider, Table ,Pagination, Modal, Button} from 'antd'
import '../style/test.scss'
const Search = Input.Search


const mockData = [{
    id: '121',
    name: '设计'
},{
    id: '1211',
    name: '设计1'
},{
    id: '1212',
    name: '设计2'
}]

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address1',
  },{
    title: '地址1',
    dataIndex: 'address',
    key: 'address2',
  },{
    title: '地址2',
    dataIndex: 'address',
    key: 'address3',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#" onClick={testStore.toggleModal}>新增</a>
      </span>
    ),
  }];
  
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }];

@observer
class Test  extends Component {
    componentDidMount () {
    }
    
    setMenu() {
        return (
            <Menu onClick={this.clickHandle} selectedKeys={[testStore.selectInfo.id]}>
                {mockData.map( item => {
                    return (<Menu.Item key={item.id}>{item.name}</Menu.Item>)
                })}
            </Menu>
        )
    }
    clickHandle(data) {
        let curSelect
        curSelect = _find(mockData, o => o.id == data.key)
        stores.testStore.setFilterVal('selectInfo', curSelect)
    }
    handleOk() {
        testStore.toggleLoading()
        setTimeout(()=> {
            testStore.toggleLoading();
            testStore.toggleModal();
            Modal.success({
                title: '添加成功！',
                content: '您可以在列表中查看',
              });
        }, 3000)
    }
    handleCancel() {
        testStore.toggleModal();
    }
    render() {
        let testStore = stores.testStore
        console.log('当前快照', getSnapshot(testStore));
        return (
           <div className="main">
            <div className="main__search">
               <Search placeholder="输入你要查询的东西" style={{width: '300px'}} enterButton="搜索"/>
            </div>
            <div className="main__drop">
                <span>筛选条件：</span>
                <Dropdown  overlay={ this.setMenu() } trigger={['click']}>
                    <a className="ant-dropdown-link main_drop--dom" href="#">
                     {testStore.selectInfo.name}<Icon type="caret-down" />
                    </a>
                </Dropdown>
                <Dropdown  overlay={ this.setMenu() } trigger={['click']}>
                    <a className="ant-dropdown-link main_drop--dom" href="#">
                     {testStore.selectInfo.name}<Icon type="caret-down" />
                    </a>
                </Dropdown>
                <Dropdown  overlay={ this.setMenu() } trigger={['click']}>
                    <a className="ant-dropdown-link main_drop--dom" href="#">
                     {testStore.selectInfo.name}<Icon type="caret-down" />
                    </a>
                </Dropdown>
            </div>
            <Divider />
            <div className="main__table">
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>
            <Divider />
            <div className="main__footer">
                <Pagination 
                    defaultCurrent={1}
                    total={data.length}
                    showTotal={total => `总共 ${total} 数据`}
                    showSizeChanger
                    showQuickJumper />
            </div>
            <Modal
                visible={testStore.showModal}
                title="新增"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" loading={testStore.showLoading} onClick={this.handleOk}>
                      确定
                    </Button>,
                ]}
                >
                 添加信息
                </Modal>
          </div>
        )
    }
}
export default Test
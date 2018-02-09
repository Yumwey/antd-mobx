import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import {find as _find}from 'lodash'
import stores, { testStore } from '../stores'
import { Input, Menu, Dropdown, Icon, Divider, Table ,Pagination, Modal, Button, Popconfirm, notification, message,Avatar} from 'antd'
import axios from 'axios'
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
    title: '头像',
    dataIndex: 'avatar_url',
    key: 'avatar_url',
    width: '10%',
    render: src => <Avatar src={src} />
  }, {
    title: '名称',
    dataIndex: 'login',
    key: 'login',
    width: '20%'
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: '10%',
  },{
    title: '地址',
    dataIndex: 'html_url',
    key: 'html_url',
    width: '30%',
  },{
    title: '得分',
    dataIndex: 'score',
    key: 'score',
    width: '10%',
  }, {
    title: '操作',
    key: 'action',
    width: '30%',
    render: (text, record) => (
      <span>
        <a href="#" className="m__left_10" onClick={ () => testStore.toggleState('showModal') }>新增</a>
        <Popconfirm title= {(<span>确定删除<ins style={{color:'red'}}>{record.name}</ins>吗？</span>)} onConfirm={() => {
            notification.info({
                message: '删除成功！',
                description: '数据列表已经更新！',
            })
        }} onCancel={() => {
            message.warning('你已经取消了当前操作！',1);
        }} okText="是" cancelText="否">
            <a href="#" className="m__left_10" style={{color:'red'}}>删除</a>
        </Popconfirm>
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
        this.getUser()
    }
    getUser() {
        testStore.toggleState('tableLoading')
        axios.get('https://api.github.com/search/users?q=code').then(res => {
            let data = res.data
            if (res.status === 200) {
                testStore.toggleState('tableLoading')
                testStore.updateData(data)
            }
        })
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
        testStore.toggleState('showLoading');
        setTimeout(()=> {
            testStore.toggleState('showModal');
            testStore.toggleState('showLoading');
            Modal.success({
                title: '添加成功！',
                content: '您可以在列表中查看',
              });
        }, 3000)
    }
    handleCancel() {
        testStore.toggleState('showModal');
    }
    render() {
        let testStore = stores.testStore
        let state = getSnapshot(testStore)
        return (
           <div className="main">
            <div className="main__search">
               <Search placeholder="输入你要查询的东西" style={{width: '300px'}} enterButton="搜索"/>
            </div>
            <div className="main__drop">
                <span>筛选条件：</span>
                <Dropdown  overlay={ this.setMenu() } trigger={['click']}>
                    <a className="ant-dropdown-link main_drop--dom" href="#">
                     {state.selectInfo.name}<Icon type="caret-down" />
                    </a>
                </Dropdown>
                <Dropdown  overlay={ this.setMenu() } trigger={['click']}>
                    <a className="ant-dropdown-link main_drop--dom" href="#">
                     {state.selectInfo.name}<Icon type="caret-down" />
                    </a>
                </Dropdown>
                <Dropdown  overlay={ this.setMenu() } trigger={['click']}>
                    <a className="ant-dropdown-link main_drop--dom" href="#">
                     {state.selectInfo.name}<Icon type="caret-down" />
                    </a>
                </Dropdown>
            </div>
            <Divider />
            <div className="main__table">
                <Table 
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={state.tableData.items}
                    loading={state.tableLoading}
                    pagination={false}
                    scroll={{y: stores.homeStore.height}}    
                />
            </div>
            <Divider />
            <div className="main__footer">
                <Pagination 
                    defaultCurrent={1}
                    total={state.tableData.total_count}
                    showTotal={total => `总共 ${total} 数据`}
                    showSizeChanger
                    showQuickJumper />
            </div>
            <Modal
                visible={state.showModal}
                title="新增"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" loading={state.showLoading} onClick={this.handleOk}>
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
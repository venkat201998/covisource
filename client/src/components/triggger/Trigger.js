import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './Trigger.css';

const { Header, Content, Footer, Sider } = Layout;

const Trigger = () => {
    return(
        <div className="Trigger d-lg-none d-sm-block">
            <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                theme="light"
                style={{ minHeight: 60}}
                
            >
                {/* <div className="logo" /> */}
                <Menu theme="light" mode="vertical" defaultSelectedKeys={[]}>
                    <Menu.Item key="1">
                        <div className="row p-1">
                            <div className="col-2 text-end">
                                <span><i class="fa fa-phone-volume fs-4"></i></span>
                            </div>
                            <div className="col-10">
                                <h6 className="fw-bold fs-6">Number</h6>
                                <h6 className="contacts">9700960964</h6>
                            </div>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <div className="row p-1">
                            <div className="col-2 text-end">
                                <span><i class="fa fa-user-headset fs-4"></i></span>
                            </div>
                            <div className="col-10">
                                <h6 className="fw-bold fs-6">Health Ministry</h6>
                                <h6 className="contacts">9700960964</h6>
                            </div>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <div className="row p-1">
                            <div className="col-2 text-end">
                                <span><i class="fa fa-child fs-4"></i></span>
                            </div>
                            <div className="col-10">
                                <h6 className="fw-bold fs-6">Child</h6>
                                <h6 className="contacts">9700960964</h6>
                            </div>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <div className="row p-1">
                            <div className="col-2 text-end">
                                <span><i class="fa fa-head-side-medical fs-4"></i></span>
                            </div>
                            <div className="col-10">
                                <h6 className="fw-bold fs-6">Mental Health</h6>
                                <h6 className="contacts">9700960964</h6>
                            </div>
                        </div>
                    </Menu.Item>
                </Menu>
            </Sider>
            {/* <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    content
                </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout> */}
            </Layout>
            {/* mountNode, */}
        </div>
      );
}

export default Trigger;
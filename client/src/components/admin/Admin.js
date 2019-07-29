import React from "react";
import { connect } from "react-redux";
import { Layout, Spin, Empty } from "antd";

import { fetchUsers } from "../../actions/user";
import UserList from "./UserList";
import UserDetails from "./UserDetails";

const { Sider, Header, Content } = Layout;
class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedUser: null,
      errors: {}
    };
  }

  handleSelectUser(user) {
    this.setState({
      selectedUser: user
    });
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <Layout>
        <Header>Admin</Header>
        <Layout>
          <Sider theme="light" width="400">
            {this.props.userReducers.loading ? (
              <Spin />
            ) : (
              <UserList
                onSelect={user => {
                  this.handleSelectUser(user);
                }}
                users={this.props.userReducers.users}
              />
            )}
          </Sider>
          <Content>
            {this.state.selectedUser ? (
              <UserDetails
                user={this.state.selectedUser}
                users={this.props.userReducers.users}
              />
            ) : (
              <Empty />
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({ userReducers: state.userReducers });
export default connect(
  mapStateToProps,
  { fetchUsers }
)(Admin);

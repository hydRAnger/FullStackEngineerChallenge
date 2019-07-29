import React from "react";
import { connect } from "react-redux";
import { Layout, Spin, Empty, Button } from "antd";

import { signOutUser } from "../../actions/auth";
import { deleteUser, fetchUsers } from "../../actions/user";
import UserList from "./UserList";
import UserModal from "./UserModal";
import UserDetails from "./UserDetails";
import "./admin.scss";

const { Sider, Header, Content } = Layout;
class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedUser: null,
      showUserModal: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    const { selectedUser } = this.state;
    if (!selectedUser) {
      return;
    }
    const user = nextProps.userReducers.users.find(
      user => user._id === selectedUser._id
    );
    this.setState({
      selectedUser: user
    });
  }

  handleSelectUser = user => {
    this.setState({
      selectedUser: user
    });
  };

  handleDeleteUser = user => {
    this.props.deleteUser(user).then(() => {
      this.props.fetchUsers();
    });
  };

  toggleUserModal = showUserModal => {
    this.setState({
      showUserModal
    });
  };

  handleSignOut = e => {
    e.preventDefault();

    this.props.history.push("/signin");
    this.props.signOutUser();
  };

  render() {
    return (
      <Layout>
        <Header className="header-admin">
          Admin
          <Button
            className="btn-signout"
            icon="logout"
            type="primary"
            onClick={this.handleSignOut}
          >
            SignOut
          </Button>
        </Header>
        <Layout>
          <Sider theme="light" width="400" className="sidebar-admin">
            <Button
              icon="user-add"
              type="dashed"
              size="large"
              block
              onClick={() => {
                this.toggleUserModal(true);
              }}
            >
              Create New User
            </Button>
            {this.props.userReducers.loading ? (
              <Spin />
            ) : (
              <UserList
                onDelete={this.handleDeleteUser}
                onSelect={this.handleSelectUser}
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
          <UserModal
            visible={this.state.showUserModal}
            onClose={() => {
              this.toggleUserModal(false);
            }}
          />
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  authReducers: state.authReducers,
  userReducers: state.userReducers
});
export default connect(
  mapStateToProps,
  { deleteUser, fetchUsers, signOutUser }
)(Admin);

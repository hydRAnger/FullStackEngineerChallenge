import React from "react";
import { List, Avatar, Button, Icon, Modal } from "antd";

const { confirm } = Modal;
class UserList extends React.Component {
  handleSelect(user) {
    this.props.onSelect && this.props.onSelect(user);
  }

  handleDelete(user) {
    const service = this.props.onDelete;
    confirm({
      title: "Confirm delete user.",
      content: `Do you want to delete ${user.name}?`,
      onOk() {
        service && service(user);
      }
    });
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.users}
        renderItem={user => (
          <List.Item
            actions={[
              <Button
                type="danger"
                size="small"
                shape="circle"
                icon="close"
                onClick={this.handleDelete.bind(this, user)}
              />
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size="large"
                  onClick={this.handleSelect.bind(this, user)}
                >
                  {user.name[0]}
                </Avatar>
              }
              title={
                <Button
                  onClick={this.handleSelect.bind(this, user)}
                  type="link"
                  size="large"
                >
                  {user.name}
                </Button>
              }
              description={
                <p>
                  <Icon type="team" /> {user.department}
                </p>
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

export default UserList;

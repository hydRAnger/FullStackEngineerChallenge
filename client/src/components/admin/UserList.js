import React from "react";
import { List, Avatar, Button, Icon } from "antd";

class UserList extends React.Component {
  handleSelect(user) {
    this.props.onSelect && this.props.onSelect(user);
  }

  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.users}
        renderItem={user => (
          <List.Item
            actions={[
              <Button type="primary" shape="circle" icon="edit" />,
              <Button type="danger" shape="circle" icon="close" />
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon="user" />}
              title={
                <Button
                  onClick={this.handleSelect.bind(this, user)}
                  type="link"
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

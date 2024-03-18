
import React, { useState, useEffect } from 'react';
import UsersTable from '../src/components/userTable';
import UserPosts from '../src/components/posts';
import { Drawer, Spin } from 'antd';

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false); // State to manage drawer visibility

  // Retrieving USERS from Json
  // Income to the array users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();

  }, []);

  // on select user
  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setDrawerVisible(true); // Open drawer when a user is selected
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false); // Close drawer when necessary
  };

  return (
    <div>
      {loading && <Spin size='large' />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {/* Sending to the component of the table to display the data in the table */}
          {/* Throwing a user selection function that is executed within a 
            table component and returns the selected user */}

          <UsersTable users={users} setSelectedUser={handleSelectUser} />

          {/* Opening the right side screen for the post 
          display component and adding a post,
           sending the selected user*/}

          <Drawer
            title={selectedUser ? selectedUser.name + '`s Posts' : ""}
            placement="right"
            onClose={handleCloseDrawer}
            open={drawerVisible}
            width={700}
          >
            {selectedUser && <UserPosts selectedUser={selectedUser} />}
          </Drawer>
        </>
      )}
    </div>
  );
};

export default App;

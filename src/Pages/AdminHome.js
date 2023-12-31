import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminHome.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [phoneInput, setPhoneInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [userFound, setUserFound] = useState(false);
  const [expandedInputSection, setExpandedInputSection] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        setUsers(response.data);
        const blocked = response.data.filter(user => user.blocked);
        setBlockedUsers(blocked);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, []);

  const updateUser = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:8000/users/${updatedUser.id}`, updatedUser);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const checkUser = () => {
    const foundUser = users.find(user => user.phone === phoneInput);
    if (foundUser) {
      setCurrentUser(foundUser);
      setUserFound(true);
      setExpandedInputSection(true);
    } else {
      setUserFound(false);
      setExpandedInputSection(false);
    }
  };

  const toggleBlock = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, blocked: !currentUser.blocked };
      updateUser(updatedUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setCurrentUser(updatedUser);

      if (updatedUser.blocked) {
        setBlockedUsers([...blockedUsers, updatedUser]);
      } else {
        setBlockedUsers(blockedUsers.filter(user => user.id !== updatedUser.id));
      }
    }
  };

  const changeAccessLevel = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        access: currentUser.access === 'user' ? 'admin' : 'user',
      };
      updateUser(updatedUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setCurrentUser(updatedUser);
    }
  };

  const unblockUser = (user) => {
    const updatedUser = { ...user, blocked: false };
    updateUser(updatedUser);
    setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    setBlockedUsers(blockedUsers.filter(u => u.id !== updatedUser.id));

    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
    setUserFound(true);
  };

  return (
    <div className="admin-page">
      <div className={`input-user${expandedInputSection ? ' expanded' : ''}`}>
        <div className="input-section">
          <input
            type="tel"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="Enter phone number"
          />
          <button onClick={checkUser}>Check User</button>
        </div>
        {userFound && currentUser ? (
          <div className="user-status">
            <p>Phone number: {currentUser.phone}</p>
            <p>Password: {currentUser.password}</p>
            <p>Status: {currentUser.blocked ? 'Blocked' : 'Not Blocked'}</p>
            <p>Access: {currentUser.access}</p>
            <button onClick={toggleBlock}>{currentUser.blocked ? 'Unblock' : 'Block'}</button>
            <button onClick={changeAccessLevel}>{currentUser.access === 'user' ? 'Admin' : 'User'}</button>
          </div>
        ) : (
          <p>User not found.</p>
        )}
      </div>

      <div className="blocked-users">
        <h2>Blocked Users</h2>
        <ul>
          {blockedUsers.map((user) => (
            <li key={user.id}>
              <div className="blocked-user-item">
                <p>{user.phone}</p>
                <button onClick={() => unblockUser(user)}>Unblock</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useTheme } from './ThemProvider';
import './Dashboard.css';

function Dashboard() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then((response) => response.json())
      .then(setData)
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((user) =>
      user.login.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const openModal = useCallback((user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  const handleProfile = useCallback((url) => {
    window.open(url, '_blank');
  }, []);

  return (
    <div className={`dashboard ${theme}`}>
      <h1>Search User</h1>
      <button onClick={toggleTheme}>Theme</button>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users"/>
      <ul>
        {filteredData.map((user) => (
          <li key={user.id} onClick={() => openModal(user)}>
            {user.login}
          </li>
        ))}
      </ul>
      {isModalOpen && selectedUser && (
        <div className="modal">
          <button onClick={closeModal}>Close</button>
          <h2>{selectedUser.login}</h2>
          <p>ID: {selectedUser.id}</p>
          <p>Bio: {selectedUser.bio || 'No bio available'}</p>
          <button onClick={() =>handleProfile(selectedUser.html_url)}> View Profile</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

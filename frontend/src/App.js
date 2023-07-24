import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/items'; // Replace with your backend URL

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchItems = async () => {
    try {
      const response = await axios.get(apiUrl);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreateItem = async () => {
    try {
      const response = await axios.post(apiUrl, { name, description });
      setItems([...items, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      setItems(items.filter((item) => item.id !== response.data.id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = async (id, newName, newDescription) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, {
        name: newName,
        description: newDescription,
      });
  
      // Find the edited item in the items list and update it
      const editedItemIndex = items.findIndex((item) => item.id === id);
      if (editedItemIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[editedItemIndex] = response.data;
        setItems(updatedItems);
      }
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };
  

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description} &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => handleEditItem(item.id, prompt('Enter new name:'), 
             prompt('Enter new description:'))}>Edit</button>&nbsp;&nbsp;
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreateItem}>Create Item</button>
      </div>
    </div>
  );
}

export default App;
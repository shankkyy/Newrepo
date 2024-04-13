import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [lists, setLists] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedLists = localStorage.getItem('lists');
    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }
  }, []);

  const opentab = (link) => { window.open(link) };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddLink = () => {
    if (inputValue.trim() !== '') {
      const newLists = [...lists, { name: inputValue.substring(8, 20), link: inputValue }];
      setLists(newLists);
      localStorage.setItem('lists', JSON.stringify(newLists));
      setInputValue(''); 
      console.log(lists)
    }
  };

  const handleDeleteLink = (index) => {
    const updatedLists = [...lists];
    updatedLists.splice(index, 1);
    setLists(updatedLists);
    localStorage.setItem('lists', JSON.stringify(updatedLists));
  };

  const fetchFavicon = (url) => {
    return `https://www.google.com/s2/favicons?domain=${url}`;
  };

  const filteredLists = lists.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.link.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h3>Add the links</h3>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <div className='lists'>
        {filteredLists.map((item, index) => (
          <div key={index} className="link-container">
            <button onClick={() => { opentab(item.link) }} className='button'>
              <img src={fetchFavicon(item.link)} alt="Favicon" className="favicon" />
              {item.name}
            </button>
            <button onClick={() => { handleDeleteLink(index) }} className="delete-button">X</button>
          </div>
        ))}
      </div>
      <div>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault(); 
              handleAddLink(); 
            }
          }} 
        />
        <button onClick={handleAddLink}>Add Link</button>
      </div>
    </div>
  );
}

export default App;

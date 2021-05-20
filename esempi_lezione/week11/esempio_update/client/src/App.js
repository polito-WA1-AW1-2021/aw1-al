import {useState, useEffect} from 'react';

function ShoppingList() {
  const [list, setList] = useState([]);
  const [element, setElement] = useState('');
  const [update, setUpdate] = useState(true);

  useEffect(()=> {
    const getItems = async() => {
      const response = await fetch('/api/items');
      const items = await response.json();
      setList(items);
      setUpdate(false);
    };
    if(update)
      getItems();
  }, [update]);

  const addItem = async () => {
    setElement('');
    setList(items => [...items, `${element} (temp)`]);

    const response = await fetch('/api/items', {
      method: 'POST',
      body: element,
    });
    if (response.ok)
      setUpdate(true);
  };

  return (<>
    <ul>{list.map((item, i) => <li key={i}>{item}</li>)}</ul>
    <input type="text" value={element} onChange={(ev)=>setElement(ev.target.value)}></input>
    <button onClick={addItem}>Add</button>
  </>
  );
}

function App() {

  return (
    <div className="App">
      <ShoppingList/>
    </div>
  );
}

export default App;

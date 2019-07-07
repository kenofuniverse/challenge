import React from 'react';
import Tree from './components/Tree';
import Sortable from './components/Sortable';
import Collapsible from './components/Collapsible';
import './App.css';

const data = [
  {
    text: "Movies",
    children: [
      {
        text: "Horror",
        children: [
          {
            text: "Halloween"
          },
          {
            text: "Alien"
          }
        ]
      },
      {
        text: "Action",
        children: [
          {
            text: "Stone Cold"
          },
          {
            text: "Commando"
          }
        ]
      }
    ]
  },
  {
    text: "Books",
    children: [
      {
        text: "Children of time"
      }
    ]
  }
];


const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container text-left">
        <Collapsible>
          <Sortable>
            <div>
              <Tree data={data} />
              <Tree data={data} />
            </div>
          </Sortable>
        </Collapsible>
      </div>
    </div>
  );
}

export default App;

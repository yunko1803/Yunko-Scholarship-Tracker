import React, { useState, useEffect } from 'react';
import './App.scss';
import { db } from '../utils/db';
import Tabs from '../components/Tabs';
import ScholarTable from '../containers/ScholarTable';
import { Scholar } from '../models/index';

const groups = ['A', 'B', 'C', 'D'];
function App() {
  const [group, setGroup] = useState('A');
  const [scholars, setScholars] = useState<Scholar[]>([]);

  useEffect(() => {
    const selectedGroup = 'group' + group;
    db.collection(selectedGroup).get()
      .then((querySnapShot) => {
        let ary: Scholar[] = [];
        querySnapShot.forEach((doc) => {
          ary.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setScholars(ary);
      })
  }, [group]);

  return (
    <div className="App">
      Yunko Scholarship

      <Tabs
        className="Tabs"
        contents={groups}
        onSelect={setGroup}
      />

      <h1>group {group}</h1>

      <ScholarTable
        group={group}
        scholars={scholars}
      />
    </div>
  );
}

export default App;

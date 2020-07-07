import React, { useEffect, useState } from 'react';
import db, { Timestamp } from './db';

type WeightLog = {
  id: string;
  entries: WeightEntries[];
};
type WeightEntries = {
  id: string;
  date: InstanceType<typeof Timestamp>;
  weight: number;
};

const it = Timestamp.fromDate(new Date());

function App() {
  const [groups, setGroups] = useState<WeightLog[]>([]);
  useEffect(() => {
    return db
      .collection(`/users/${'Z5BuAZuGIMxBIyAzsZGs'}/weights`)
      .onSnapshot((s) => {
        const out: WeightLog[] = [];

        s.forEach((d) => {
          const data: {
            [k: string]: {
              date: InstanceType<typeof Timestamp>;
              weight: number;
            };
          } = d.data();

          const entries = Object.entries(data)
            .map((it) => {
              const [k, val] = it;
              return { id: k, ...val };
            })
            .sort(
              (a, b) => parseInt(b.date.valueOf()) - parseInt(a.date.valueOf()),
            );

          out.push({ id: d.id, entries });
        });

        setGroups(out);
      });
  }, []);

  const [formWeight, setWeight] = useState(100);
  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.doc(`/users/Z5BuAZuGIMxBIyAzsZGs/weights/2020_28`).set(
      {
        [db.collection('/users').doc().id]: {
          date: Timestamp.now(),
          weight: formWeight,
        },
      },
      { merge: true },
    );
  };

  return (
    <div>
      <form onSubmit={save}>
        <input
          className="border px-3 py-1 rounded"
          type="number"
          value={formWeight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
        />
        <button className="border px-3 py-1 rounded border-blue-300 bg-blue-100 ml-2">
          save
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Weight</td>
            <td>Weekly Average</td>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => {
            return g.entries.map((en, i) => {
              return (
                <tr key={en.id}>
                  <td>{en.date.seconds}</td>
                  <td>{en.weight}</td>
                  {i === 0 && <td rowSpan={g.entries.length}>{g.id}</td>}
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

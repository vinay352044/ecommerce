import React from 'react';

const Table = ({ data, headers, handleUpdate, handleProductDelete }) => {
  return (
    <div className="px-20">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header.key} className="border px-4 py-2">{header.label}</th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {headers.map(header => (
                <td key={header.key} className="border px-4 py-2">{item[header.key]}</td>
              ))}
              <td className="border px-4 py-2 flex justify-center items-center space-x-2">
                <button onClick={() => handleUpdate(item.id)} className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                  Update
                </button>
                <button onClick={() => handleProductDelete(item.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

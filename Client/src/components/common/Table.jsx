import React from 'react';

const Table = ({ data, type, handleUpdate, handleProductDelete }) => {
  return (
    <div className="px-20">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {type === 'category' && (
              <>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Actions</th>
              </>
            )}
            {type === 'product' && (
              <>
                <th className="border px-4 py-2">Product ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Brand</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Actions</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {type === 'category' && (
                <>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                </>
              )}
              {type === 'product' && (
                <>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.title}</td>
                  <td className="border px-4 py-2">{item.price}</td>
                  <td className="border px-4 py-2">{item.brand}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                </>
              )}
              <td className="border px-4 py-2 flex justify-center items-center space-x-2">
                <button onClick={() => handleUpdate(item.id)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
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

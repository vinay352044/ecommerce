import React from 'react';

const Table = ({ data, type, handleUpdate, handleProductDelete }) => {
  return (
    <table className="table-auto w-full mt-8 border">
      <thead>
        <tr className="border-b">
          {type === 'category' && (
            <>
              <th className="w-1/6 p-2">ID</th>
              <th className="w-1/3 p-2">Name</th>
            </>
          )}
          {type === 'product' && (
            <>
              <th className="w-1/6 p-2">Product ID</th>
              <th className="w-1/3 p-2">Title</th>
              <th className="w-1/6 p-2">Price</th>
              <th className="w-1/6 p-2">Brand</th>
              <th className="w-1/6 p-2">Category</th>
              <th className="w-1/6 p-2">Actions</th>
            </>
          )}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b">
            {type === 'category' && (
              <>
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.name}</td>
              </>
            )}
            {type === 'product' && (
              <>
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.price}</td>
                <td className="p-2">{item.brand}</td>
                <td className="p-2">{item.category}</td>
              </>
            )}
            <td className="p-2">
              <div className="flex space-x-2">
                <>
                  <button onClick={() => handleUpdate(item.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    Update
                  </button>
                  <button onClick={() => handleProductDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Delete
                  </button>
                </>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

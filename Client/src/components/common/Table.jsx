import React from 'react';

const Table = ({ products, handleProductUpdate, handleProductDelete }) => {
  return (
    <table className="table-auto w-full mt-8 border">
      <thead>
        <tr className="border-b">
          <th className="w-1/6 p-2">Product ID</th>
          <th className="w-1/3 p-2">Title</th>
          <th className="w-1/6 p-2">Price</th>
          <th className="w-1/6 p-2">Brand</th>
          <th className="w-1/6 p-2">Category</th>
          <th className="w-1/6 p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-b">
            <td className="p-2">{product.id}</td>
            <td className="p-2">{product.title}</td>
            <td className="p-2">{product.price}</td>
            <td className="p-2">{product.brand}</td>
            <td className="p-2">{product.category}</td>
            <td className="p-2">
              <div className="flex space-x-2">
                <button onClick={() => handleProductUpdate(product.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                  Update
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  View
                </button>
                <button onClick={() => handleProductDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
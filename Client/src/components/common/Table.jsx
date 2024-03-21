import ButtonComponent from './ButtonComponent';

const Table = ({ data, headers, handleUpdate, handleDelete }) => {
  return (
    <div className="overflow-x-auto ">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} className="border px-4 py-2">
                {header.label}
              </th>
            ))}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {headers.map((header) => (
                <td key={header.key} className="border px-4 py-2">
                  {item[header.key]}
                </td>
              ))}
              <td className="border px-4 py-2 flex justify-center items-center space-x-2">
                <ButtonComponent onClick={() => handleUpdate(item.id)} buttonStyle="px-[8px] py-[4px] text-sm ">
                  Update
                </ButtonComponent>
                <ButtonComponent onClick={() => handleDelete(item.id)} buttonStyle="px-[8px] py-[4px] text-sm bg-[#c53030] border-[#c53030] hover:text-[#c53030]">
                  Delete
                </ButtonComponent>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

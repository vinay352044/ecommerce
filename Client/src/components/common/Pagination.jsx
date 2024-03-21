import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    nPages > 0 && (
      <div className="mt-6">
        <ul className="flex justify-center space-x-4">
          {currentPage !== 1 && (
            <li className="bg-[#85c7f7] text-white px-4 py-2 rounded-l focus:outline-none">
              <button onClick={goToPrevPage}>Previous</button>
            </li>
          )}
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`${
                currentPage === pgNumber ? "bg-[#2590db]" : "bg-[#85c7f7]"
              } text-white px-4 py-2 rounded focus:outline-none`}
            >
              <button onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</button>
            </li>
          ))}
          {currentPage !== nPages && (
            <li className="bg-[#85c7f7] text-white px-4 py-2 rounded-r focus:outline-none">
              <button onClick={goToNextPage}>Next</button>
            </li>
          )}
        </ul>
      </div>
    )
  );
};

export default Pagination;

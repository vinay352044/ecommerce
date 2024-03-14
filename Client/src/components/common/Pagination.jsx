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
        <ul className="pagination">
          {currentPage !== 1 && (
            <li className="page-item">
              <button
                onClick={goToPrevPage}
                className="page-link bg-light-blue-500 text-white px-4 py-2 rounded-l focus:outline-none"
              >
                Previous
              </button>
            </li>
          )}
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`page-item ${
                currentPage === pgNumber ? "active" : ""
              }`}
            >
              <button
                onClick={() => setCurrentPage(pgNumber)}
                className={`page-link bg-light-blue-500 text-white px-4 py-2 focus:outline-none ${
                  currentPage === pgNumber ? "bg-light-blue-700" : ""
                }`}
              >
                {pgNumber}
              </button>
            </li>
          ))}

          {currentPage !== nPages && (
            <li className="page-item">
              <button
                onClick={goToNextPage}
                className="page-link bg-light-blue-500 text-white px-4 py-2 rounded-r focus:outline-none"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </div>
    )
  );
};

export default Pagination;

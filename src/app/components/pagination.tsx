import { PaginationProps } from "../interfaces";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <nav aria-label="Pagination" className="flex justify-center mt-4">
      <ul className="inline-flex items-center space-x-2">
        <li>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className={`px-3 py-1 text-sm font-medium rounded-md transition 
              ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-teal-700 text-white hover:bg-teal-800"
              }`}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        <li>
          <span className="px-3 py-1 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        </li>

        <li>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
            className={`px-3 py-1 text-sm font-medium rounded-md transition 
              ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-teal-700 text-white hover:bg-teal-800 cursor-pointer"
              }`}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <span className="px-4 py-2">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    );
  };
  
  export default Pagination;
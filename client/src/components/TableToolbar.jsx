import { useState } from 'react';
import { FaLock, FaLockOpen, FaTrash } from 'react-icons/fa';

const TableToolbar = ({ selectedCount, onAction, onFilterChange }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mb-3 p-3 bg-light rounded border gap-3">
      <div className="d-flex flex-wrap gap-2">
        <button
          className="btn btn-outline-primary d-flex align-items-center gap-1"
          onClick={()=> onAction('block')}
          disabled={selectedCount === 0}
        >
          <FaLock /> Block
        </button>
        <button
          className="btn btn-outline-primary d-flex align-items-center"
          onClick={()=> onAction('unblock')}
          disabled={selectedCount === 0}
        >
          <FaLockOpen />
        </button>
        <button
          className="btn btn-outline-danger d-flex align-items-center"
          onClick={()=> onAction('delete')}
          disabled={selectedCount === 0}
        >
          <FaTrash />
        </button>
      </div>
      <input
        type="text"
        className="form-control w-auto"
        placeholder="Filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default TableToolbar;

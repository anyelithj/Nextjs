import React from 'react';

interface PaginationButtonProps {
  direction: 'prev' | 'next';
  currentPage: number;
  totalPage: number;
  onPageChange: (direction: 'prev' | 'next') => void;
}

const Pagination: React.FC<PaginationButtonProps> = ({
  direction,
  currentPage,
  totalPage,
  onPageChange,
}) => {
  const isPrev = direction === 'prev';
  const isNext = direction === 'next';
  const isDisabled =
    (isPrev && currentPage === 1) || (isNext && currentPage === totalPage);

  return (
    <button
      onClick={() => onPageChange(direction)}
      className={`rounded-lg bg-purple-900 p-2 px-8 hover:bg-purple-950 ${
        isDisabled ? 'hidden' : ''
      }`}
      disabled={isDisabled}
    >
      {isPrev ? 'Prev' : 'Next'}
    </button>
  );
};

export default Pagination;

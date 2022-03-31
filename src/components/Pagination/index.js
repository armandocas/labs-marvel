import { useMemo } from 'react';
import PropTypes from 'prop-types';
import Button from '@components/Button';
import generatePageNumber from '@utils/generatePageNumber';
import iconNext from '@assets/icones/next/next.png';
import iconPrevious from '@assets/icones/next/previous.png';
import * as S from './styles';

const Pagination = ({ currentPage, total, setPage }) => {
  const list = useMemo(() => {
    const previousPage = generatePageNumber(currentPage, total, false);
    const nextPage = generatePageNumber(currentPage, total, true);

    const pages = [
      generatePageNumber(previousPage, total, false),
      previousPage,
      currentPage,
      nextPage,
      generatePageNumber(nextPage, total, true),
    ];

    return pages;
  }, [total, currentPage]);

  return (
    <S.Pagination>
      <Button data-testid="button-previous" onClick={() => setPage(false)}>
        <img src={iconPrevious} alt="Anterior" width="20" />
      </Button>

      {list.map((page, index) => (
        <Button
          key={page}
          className={`button-page-${index}`}
          data-testid={`button-page-${index}`}
          onClick={() => setPage(false, page + 1)}
          isFill={page === currentPage}
        >
          {page}
        </Button>
      ))}

      <Button data-testid="button-next" onClick={() => setPage(true)}>
        <img src={iconNext} alt="Próximo" width="20" />
      </Button>
    </S.Pagination>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;

import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import iconHeartUnfilled from '@assets/icones/heart/Path Copy 2@2x.png';
import iconHeartFilled from '@assets/icones/heart/Path Copy 7@2x.png';
import iconReverse from '@assets/icones/reverse/reverse.png';
import Switch from '@components/Switch';
import Button from '@components/Button';
import Input from '@components/Input';
import Loader from '@components/Loader';
import CharacterCard from '@components/CharacterCard';
import Logo from '@components/Logo';
import ImgAction from '@components/CallToAction';
import Pagination from '@components/Pagination';
import useFetchCharacters from '@services/useFetchCharacters';
import useDebounce from '@utils/useDebounce';
import sortByName from '@utils/sortByName';
import useFavoritesStorage from '@utils/useFavoritesStorage';
import generatePageNumber from '@utils/generatePageNumber';
import { injectStyle } from 'react-toastify/dist/inject-style';
import Footer from '../../components/Footer';
import * as S from './styles';


injectStyle();

const Home = () => {
  const { search } = useLocation();
  const [, characterName] = search.split('=');
  const [searchName, setSearchName] = useState(characterName || '');
  const [filterByFavorite, setFilterByFavorite] = useState(false);
  const [filterByName, setFilterByName] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const { getFavorites } = useFavoritesStorage();
  const debouncedSearchTerm = useDebounce(searchName, 500);
  const {
    getCharacters,
    getFavoritesCharacters,
    charactersData,
    charactersList,
    setCharactersList,
    charactersIsLoading,
    charactersError,
  } = useFetchCharacters();

  useEffect(() => {
    const isRedirect = !!characterName;

    if (!isRedirect) getCharacters(characterName || '');
  }, [characterName, getCharacters]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const initialPage = 1;
      setCurrentPage(initialPage);
      setFilterByName('desc');
      getCharacters(debouncedSearchTerm, initialPage);
    }
  }, [debouncedSearchTerm, getCharacters]);

  const handleSearchCharacters = ({ target: { value } }) => {
    if (value === '') {
      getCharacters('');
      setFilterByName('desc');
    }
    setFilterByFavorite(false);
    setSearchName(value);
  };

  const handleFilterByFavorite = () => {
    setFilterByFavorite((oldFilterByFavorite) => {
      const newFilterByFavorite = !oldFilterByFavorite;

      if (newFilterByFavorite) {
        const favoritesId = getFavorites();
        getFavoritesCharacters(favoritesId);
      } else {
        getCharacters();
      }

      setSearchName('');
      setFilterByName('desc');

      return newFilterByFavorite;
    });
  };

  const handleFilterByName = (sortTerm) => {
    const currentSortTerm = sortTerm === 'asc' ? 'desc' : 'asc';
    setCharactersList((oldCharactersList) => sortByName(oldCharactersList, sortTerm));
    setFilterByName(currentSortTerm);
  };

  const handlePaginate = useCallback(
    (isNext, customPage = null) => {
      setCurrentPage((oldPage) => {
        const newPage = generatePageNumber(customPage || oldPage, charactersData.total, isNext);
        getCharacters(debouncedSearchTerm, newPage);
        setFilterByName('desc');

        return newPage;
      });
    },
    [charactersData, debouncedSearchTerm, getCharacters],
  );

  return (
    <>
      <ToastContainer />
      <S.HomeHeader>
        <Logo />
        <br />
        <ImgAction />
      </S.HomeHeader>

      <S.HomeSection>
        <h2>Mais de 1.500 Heróis a sua escolha. Todos os personagens que você ❤ estão aqui.</h2>

        <S.HomeSearch>
          <Input
            id="search-characters"
            type="search"
            placeholder="Procure por heróis"
            value={searchName}
            onChange={handleSearchCharacters}
          />
        </S.HomeSearch>

        <S.HomeFilter>
          <p>
            {!charactersIsLoading && !charactersError && charactersData
              ? `Encontrado${charactersData.count === 1 ? '' : 's'} ${charactersData.count} herói${charactersData.count === 1 ? '' : 's'
              }`
              : `Pesquisando... `}

            {charactersError && `Erro!`}
          </p>

          <S.FilterActions>
            <p>
              <img src={iconReverse} alt="Herói" width="20" /> Inverter
              <Switch
                id="switch-filter"
                name="switch-filter"
                checked={filterByName === 'asc'}
                onChange={() => handleFilterByName(filterByName)}
              />
            </p>

            <Button onClick={handleFilterByFavorite}>
              <S.FilterFavoriteImg
                src={filterByFavorite ? iconHeartFilled : iconHeartUnfilled}
                alt="Favorito"
                width="20"
              />
              Favoritos
            </Button>
          </S.FilterActions>
        </S.HomeFilter>

        <S.HomeArticle>
          {charactersIsLoading && (
            <S.LoaderContainer>
              <Loader />
            </S.LoaderContainer>
          )}

          {!charactersIsLoading && !charactersError && (
            <S.CharactersContainer>
              {charactersList &&
                charactersList.map((character) => <CharacterCard key={character.id} character={character} />)}

              {charactersList && charactersData && charactersData.count === 0 && (
                <S.ErrorMessage>Nenhum herói encontrado</S.ErrorMessage>
              )}
            </S.CharactersContainer>
          )}

          {!charactersIsLoading && charactersError && <S.ErrorMessage>{charactersError}</S.ErrorMessage>}
        </S.HomeArticle>
      </S.HomeSection>

      {charactersData && charactersData.total > 60 && (
        <Pagination currentPage={currentPage} total={charactersData.total} setPage={handlePaginate} />
      )}

      <Footer />
    </>
  );
};

export default Home;

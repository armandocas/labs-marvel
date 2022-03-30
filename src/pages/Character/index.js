import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css"
import iconBook from '@assets/icones/book/Group.png';
import iconVideo from '@assets/icones/video/Shape.png';
import iconStar from '@assets/review/Group 4.png';
import iconHeartUnfilled from '@assets/icones/heart/Path Copy 2@2x.png';
import iconHeartFilled from '@assets/icones/heart/Path Copy 7@2x.png';
import Input from '@components/Input';
import Button from '@components/Button';
import Footer from '@components/Footer';
import Logo from '@components/Logo';
import Loader from '@components/Loader';
import useFetchCharacterComics from '@services/useFetchCharacterComics';
import formatDate from '@utils/formatDate';
import useFavoritesStorage from '@utils/useFavoritesStorage';
import useFetchCharacterById from '@services/useFetchCharacterById';
import * as S from './styles';

const Character = () => {
  const { search } = useLocation();
  const router = useHistory();
  const { getComics, comics, comicsIsLoading, comicsError } = useFetchCharacterComics();
  const { verifyFavorite, updateFavorites, getFavorites } = useFavoritesStorage();
  const [, characterId] = search.split('=');
  const [isFavorite, setIsFavorite] = useState(verifyFavorite(characterId));
  const [characterName, setCharacterName] = useState('');
  const { getCharacterById, character, characterIsLoading, characterError } = useFetchCharacterById();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCharacterById(characterId);
  }, [characterId, getCharacterById]);

  useEffect(() => {
    getComics(characterId);
  }, [characterId, getComics]);

  const handleAddToFavorite = useCallback(() => {
    setIsFavorite((oldIsFavorite) => {
      const favorites = getFavorites();

      updateFavorites(oldIsFavorite, characterId);

      if (favorites.length === 5 && oldIsFavorite == false) {
        console.log('Entrou❤😎');
        toast("Ops...Você só pode ter 5 Heróis Favoritos! ", {
          type: "error",
          position: "top-right",
          theme: "colored"
        });

      }

      return favorites.length < 5 ? !oldIsFavorite : oldIsFavorite;
    });
  }, [characterId, getFavorites, updateFavorites]);

  const handleSearchCharacter = ({ key }) => key === 'Enter' && router.push(`/?characterName=${characterName}`);

  const handleChange = ({ target: { value } }) => setCharacterName(value);

  const dateLastComic = useMemo(() => {
    if (comics && comics.results.length > 0) {
      const [comic] = comics.results;
      const saleDate = comic.dates.find((date) => date.type === 'onsaleDate');
      return saleDate?.date || null;
    }

    return null;
  }, [comics]);

  return (
    <>
      <ToastContainer />
      <S.CharacterHeader>
        <Logo />

        <div>
          <Input
            id="search-characters"
            type="search"
            kind="light"
            placeholder="Procure por heróis"
            value={characterName}
            onKeyPress={handleSearchCharacter}
            onChange={handleChange}
          />
        </div>
      </S.CharacterHeader>

      {characterIsLoading && (
        <S.LoaderContainer>
          <Loader />
        </S.LoaderContainer>
      )}

      {!characterIsLoading && characterError && <S.ErrorMessage>{characterError}</S.ErrorMessage>}

      {!characterIsLoading && character && (
        <S.CharacterSection>
          <S.CharacterCol width="50%" isSeparate>
            <S.CharacterName>
              <h1>{character.name}</h1>
              <Button onClick={handleAddToFavorite} minWidth="1rem" margin="0">
                <img src={isFavorite ? iconHeartFilled : iconHeartUnfilled} alt="Favoritar" />
              </Button>
            </S.CharacterName>

            <S.CharacterDescription>{character.description || 'Descrição não encontrada'}</S.CharacterDescription>

            <div>
              <S.CharacterQuantity>
                <div>
                  <p>Quadrinhos</p>
                  <S.CharacterQuantityValue>
                    <S.BookImg src={iconBook} alt="Quadrinhos" />
                    {character.comics.available}
                  </S.CharacterQuantityValue>
                </div>

                <div>
                  <p>Séries/Filmes</p>
                  <S.CharacterQuantityValue>
                    <p>
                      <S.VideoImg src={iconVideo} alt="Series" />
                      {character.series.available}
                    </p>
                  </S.CharacterQuantityValue>
                </div>
              </S.CharacterQuantity>

              <S.CharacterRatingAndLastComic>
                <p>
                  <b>Rating:</b>
                  <img src={iconStar} alt="Avaliação" />
                </p>

                <div>
                  <b>Último quadrinho: </b>
                  {comicsIsLoading && <Loader size="small" />}
                  {!comicsIsLoading && !comicsError && formatDate(dateLastComic)}
                </div>
              </S.CharacterRatingAndLastComic>
            </div>
          </S.CharacterCol>

          <S.CharacterCol width="30%">
            <img style={{ borderRadius: '50%' }}
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              width="100%"
              alt={`foto ${character.name}`}
            />
          </S.CharacterCol>
        </S.CharacterSection>
      )}

      <S.CharacterSection flexDirection="column">
        <h2>Últimos lançamentos</h2>

        <S.ComicsContainer>
          {comicsIsLoading && <Loader />}

          {!comicsIsLoading &&
            comics &&
            comics.results &&
            !comicsError &&
            comics.results.map(({ id, title, thumbnail }) => (
              <S.ComicCard key={id}>
                <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} />
                <p title={title}>{title}</p>
              </S.ComicCard>
            ))}

          {!comicsIsLoading && comics && comics.results && !comicsError && comics.results.length === 0 && (
            <S.ErrorMessage>Nenhum herói encontrado</S.ErrorMessage>
          )}

          {!comicsIsLoading && comicsError && <S.ErrorMessage>{comicsError}</S.ErrorMessage>}
        </S.ComicsContainer>
      </S.CharacterSection>

      <Footer />
    </>
  );
};

export default Character;

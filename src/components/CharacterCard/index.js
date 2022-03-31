import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import iconHeartUnfilled from '@assets/icones/heart/Path Copy 2@2x.png';
import iconHeartFilled from '@assets/icones/heart/Path Copy 7@2x.png';
import useFavoritesStorage from '@utils/useFavoritesStorage';
import { injectStyle } from 'react-toastify/dist/inject-style';
import Button from '../Button';
import * as S from './styles';


injectStyle();

const CharacterCard = ({ character }) => {
  const router = useHistory();
  const { verifyFavorite, updateFavorites, getFavorites } = useFavoritesStorage();
  const {
    id,
    name,
    thumbnail: { extension, path },
  } = character;
  const imageUrl = `${path}.${extension}`;
  const [isFavorite, setIsFavorite] = useState(verifyFavorite(id));

  const handleChangeToFavorite = useCallback(() => {
    setIsFavorite((oldIsFavorite) => {
      const favorites = getFavorites();
      updateFavorites(oldIsFavorite, id);

      if (favorites.length === 5 && oldIsFavorite === false) {
        toast('Ops...Você só pode ter 5 Heróis Favoritos! ', {
          type: 'error',
          position: 'top-right',
          theme: 'colored',
        });
      }

      if (oldIsFavorite) return !oldIsFavorite;

      return favorites.length < 5 ? !oldIsFavorite : oldIsFavorite;
    });
  }, [getFavorites, id, updateFavorites]);

  const handleNavigationToCharacter = () => router.push(`/character?id=${id}`);

  return (
    <S.CharacterCard>
      <S.CharacterThumbnail
        role="button"
        tabIndex="0"
        onKeyPress={handleNavigationToCharacter}
        onClick={handleNavigationToCharacter}
      >
        <img src={imageUrl} alt={name} />
      </S.CharacterThumbnail>

      <S.CharacterInfos>
        <p title={name}>{name}</p>
        <Button onClick={handleChangeToFavorite} minWidth="1rem">
          <img src={isFavorite ? iconHeartFilled : iconHeartUnfilled} alt="Favoritar" />
        </Button>
      </S.CharacterInfos>
    </S.CharacterCard>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    comics: PropTypes.shape({
      available: PropTypes.number.isRequired,
    }).isRequired,
    thumbnail: PropTypes.shape({
      extension: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default memo(CharacterCard);

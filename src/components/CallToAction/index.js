import { Link } from 'react-router-dom';
import callAction from '@assets/logo/artMarvel.png';
import * as S from './styles';

const CallToAction = () => (
  <Link to="/">
    <S.ImgAction src={callAction} alt="Logo Chamada" />
  </Link>
);

export default CallToAction;

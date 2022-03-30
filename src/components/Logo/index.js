import { Link } from 'react-router-dom';
import logoImg from '@assets/logo/logo.png';
import * as S from './styles';

const Logo = () => (
  <Link to="/">
    <S.Logo src={logoImg} alt="Logo" />
  </Link>
);

export default Logo;

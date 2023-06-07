import { SignIn } from '../components/sign-in';
import { Router } from '../interfaces/router';
import { MainPage } from '../pages/main';
import { WrongPages } from '../pages/wrong-pages';

export const ROUTES_NAMES = {
  MAIN_PAGE: '/main',
  OTHER: '/*',
  AUTH: '/auth',
};

export const PRIVATE_ROUTES: Router[] = [
  {
    path: ROUTES_NAMES.MAIN_PAGE,
    component: MainPage,
    exact: true,
  },
  {
    path: ROUTES_NAMES.OTHER,
    component: WrongPages,
    exact: false,
  },
];

export const PUBLIC_ROUTES: Router[] = [
  {
    path: ROUTES_NAMES.AUTH,
    component: SignIn,
    exact: true,
  },
  {
    path: ROUTES_NAMES.OTHER,
    component: WrongPages,
    exact: false,
  },
];

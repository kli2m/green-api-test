import React from 'react';
import classNames from 'classnames';

import './header.scss';

export const Header: React.FC = () => (
  <section className={classNames('header')}>
    <div className={classNames('header__logo')}></div>
    <div className={classNames('header__sign-out')}>
      <button>exit</button>
    </div>
  </section>
);

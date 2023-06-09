import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Header } from 'components/header';
import { Footer } from 'components/footer';

export const WrapperPage: React.FC<{ child: ReactNode }> = ({ child }): JSX.Element => (
  <section role="button" onKeyPress={() => {}} tabIndex={0} className={classNames('wrapper-page')}>
    <Header/>
    <div className="wrapper-page__content">{child}</div>
    <Footer/>
  </section>
);

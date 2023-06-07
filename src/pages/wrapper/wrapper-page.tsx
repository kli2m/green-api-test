import React, { ReactNode } from 'react';
import classNames from 'classnames';

export const WrapperPage: React.FC<{ child: ReactNode }> = ({ child }): JSX.Element => (
  <section role="button" onKeyPress={() => {}} tabIndex={0} className={classNames('wrapper-page')}>
    <div className="wrapper-page__content">{child}</div>
  </section>
);

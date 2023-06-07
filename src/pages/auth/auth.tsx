import React, { ReactNode } from 'react';
import './auth.scss';

export const AuthPage: React.FC<{ child: ReactNode }> = ({ child }): JSX.Element => (
  <section className="auth-page">
    <span className="auth-page__title">Messenger</span>
    <div className="auth-page__content" data-test-id="auth">
      {child}
    </div>
  </section>
);

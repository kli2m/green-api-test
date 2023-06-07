import React, { Fragment } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootState } from 'redux/redux-store';
import { schema } from '../../constants/shema';
import { fetchAuth } from '../../redux/reducers/auth-reducer';
import './sign-in.scss';

type FormData = yup.InferType<typeof schema>;

export const SignIn: React.FC = (): JSX.Element => {
  const authError = useSelector((state: RootState) => state.auth.error);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    dispatch(fetchAuth({ idInstance: data.idInstance, apiTokenInstance: data.apiTokenInstance }));
  };

  return (
    <section className="sign-in">
      <Fragment>
        <span className="sign-in__title">Sign in</span>
        <form
          data-test-id="auth-form"
          className="sign-in__form form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form__main">
            <label className={classNames('form__main_label label')}>
              <input
                className={classNames('label__input')}
                {...register('idInstance')}
                placeholder="idInstance"
              />
              <span className="label__placeholder">idInstance</span>
              <p data-test-id="hint" className={classNames('label__message')}>
                {errors.idInstance?.message}
              </p>
            </label>
            <label className={classNames('form__main_label label')}>
              <input
                className={classNames('label__input')}
                {...register('apiTokenInstance')}
                placeholder="apiTokenInstance"
              />
              <span className="label__placeholder">apiTokenInstance</span>
              <p data-test-id="hint" className={classNames('label__message')}>
                {errors.apiTokenInstance?.message}
              </p>
            </label>
          </div>
          {isSubmitted &&
            !errors.idInstance?.message &&
            !errors.apiTokenInstance?.message &&
            authError && <p>{`${authError}`}</p>}
          <button className="form__submit" type="submit">
            вход
          </button>
        </form>
      </Fragment>
    </section>
  );
};

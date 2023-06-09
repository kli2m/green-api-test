import React, { ChangeEvent, useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkNumberPhone, createGroup, setNewContact } from 'redux/reducers/chat-reducer';
import { setChangedContacts } from 'redux/reducers/auth-reducer';
import { RootState } from 'redux/redux-store';
import { schemaTwo } from '../../constants/shema';
import './main-page.scss';

type FormData = yup.InferType<typeof schemaTwo>;

export const MainPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schemaTwo) });

  const authData = useSelector((state: RootState) => state.auth.data);
  const contacts = useSelector((state: RootState) => state.auth.contacts);

  const userSettings = useSelector((state: RootState) => state.auth.userSettings);
  const existsWhatsapp = useSelector((state: RootState) => state.chat.existsWhatsapp);
  const chatError = useSelector((state: RootState) => state.chat.error);
  const newContact = useSelector((state: RootState) => state.chat.newContact);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (existsWhatsapp) {
      dispatch(createGroup({ ...authData, ...{ newContact, userSettings } }));
    }
  }, [existsWhatsapp]);

  useEffect(() => {}, [contacts]);

  const onSubmit = (data: FormData) => {
    dispatch(
      checkNumberPhone({
        ...authData,
        ...{ phoneNumber: data.phone, userSettings },
      }),
    );
    dispatch(setNewContact(data.phone));
  };

  const onCheckGroup = () => {};
  const filterContacts = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setChangedContacts(event.target.value));
  };
  return (
    <section className="main-page">
      <div className={classNames('main-page__wrapper')}>
        <div className={classNames('contacts')}>
          <div className={classNames('contacts__search')}>
            <form
              data-test-id="auth-form"
              className="contacts__search_form form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="form__main_label label">
                <input
                  className={classNames('label__input')}
                  {...register('phone')}
                  placeholder="number phone"
                  onChange={filterContacts}
                />
                <button className="submit" type="submit">
                  search
                </button>
              </label>
            </form>
            <p data-test-id="hint" className={classNames('label__message')}>
              {errors.phone?.message}
            </p>
            {chatError && (
              <p data-test-id="hint" className={classNames('label__message')}>
                {`${chatError}`}
              </p>
            )}
          </div>
          <div className={classNames('contacts__groups')}>
            {contacts &&
              contacts.length > 0 &&
              contacts.map((contact, ind) => (
                <div
                  className={classNames('item')}
                  key={`${ind + 1}+1`}
                  onClick={onCheckGroup}
                >{`${contact.name}`}</div>
              ))}
          </div>
        </div>
        <div className={classNames('main-block')}>
          <div className={classNames('main-block__view-box')}></div>
        </div>
      </div>
    </section>
  );
};

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { submitUrl, updatePosts } from '../store/inputSlice';
import Feedback from './Feedback';

import './InputField.css';

const schema = (urls) =>
  yup.object().shape({
    url: yup
      .string('This URL is incorrect')
      .required('Input the URL')
      .url('This URL is incorrect')
      .notOneOf(urls, 'This URL has already been added'),
  });

const InputField = () => {
  const data = useSelector((state) => state.input);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(data.urls)),
    reValidateMode: 'onSubmit',
  });

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(submitUrl(values.url));
  };

  useEffect(
    () => {
      const interval = setInterval(() => {
        dispatch(updatePosts(data));
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.urls],
  );

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='input'>
        <label className='label' htmlFor='add_feed'></label>
        <input
          {...register('url')}
          type='url'
          id='add_feed'
          placeholder='RSS link'
        />
        <button className='form-button'>Add</button>
      </div>
      <div>
        <p className='example'>
          Example: https://aljazeera.com/xml/rss/all.xml
        </p>
        <p className='feedback'>{errors.url && errors.url.message}</p>
        <Feedback />
      </div>
    </form>
  );
};
export default InputField;

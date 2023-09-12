import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import cn from 'classnames';
import { submitUrl, updatePosts, setError } from '../../store/appSlice.js';

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
  const { urls, status, feedback } = useSelector((state) => state.input);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(urls)),
    reValidateMode: 'onSubmit',
  });

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(submitUrl(values.url));
  };
  const onReject = () => {
    dispatch(setError(''));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePosts(urls));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [urls, dispatch]);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      reset();
    }
  }, [status, reset]);

  const classNames = cn({
    'secondary-content': true,
    feedback: true,
    error: status === 'error',
    loading: status === 'loading',
    success: status === 'success',
  });

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit, onReject)}>
      <div className='input'>
        <label className='label' htmlFor='add_feed'></label>
        <input
          {...register('url')}
          type='text'
          id='add_feed'
          placeholder='RSS link'
        />
        <button className='form-button'>Add</button>
      </div>
      <div>
        <p className='secondary-content example'>
          Example: https://aljazeera.com/xml/rss/all.xml
        </p>
        <p className='secondary-content feedback error'>
          {errors.url && errors.url.message}
        </p>
        <p className={classNames}>{feedback}</p>
      </div>
    </form>
  );
};
export default InputField;

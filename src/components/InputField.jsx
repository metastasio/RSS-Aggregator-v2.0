import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { submitUrl } from '../store/inputSlice';

import './InputField.css';

const schema = yup.object().shape({
  url: yup
    .string('This URL is incorrect')
    .required('Input the URL')
    .url('This URL is incorrect'),
  //   .notOneOf(watchedState.feed, newInstance.t('double')),
});

const InputField = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
  });

  const dispatch = useDispatch();

  const onSubmit = (input) => {
    if (!errors.url) {
      dispatch(submitUrl({ input }));
    }
  };

  useEffect(() => {
    setFocus('url');
  }, [setFocus]);

  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
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
          <p>Example: https://aljazeera.com/xml/rss/all.xml</p>
          <p className='feedback'>{errors.url && errors.url.message}</p>
        </div>
      </form>
    </>
  );
};
export default InputField;

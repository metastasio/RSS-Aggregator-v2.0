import { useDispatch } from 'react-redux';
import { removeFeed } from '../../store/appSlice';

import './FeedItem.css';

const FeedItem = ({ id, title, description }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <p className='feed feed-title'>{title}</p>
      <p className='feed feed-description'>{description}</p>
      <button className='close' onClick={() => dispatch(removeFeed(id))}>
        &times;
      </button>
    </li>
  );
};
export default FeedItem;

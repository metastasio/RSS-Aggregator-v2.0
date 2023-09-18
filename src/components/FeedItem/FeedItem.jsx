import { useDispatch } from 'react-redux';
import { removeFeed } from '../../store/appSlice';

import './FeedItem.css';

const FeedItem = ({ id, title, description }) => {
  const dispatch = useDispatch();

  return (
    <li className='feed-flex-item'>
      <div>
        <p className='feed feed-title'>{title}</p>
        <p className='feed feed-description'>{description}</p>
      </div>

      <button className='close' onClick={() => dispatch(removeFeed(id))}>
        &times;
      </button>
    </li>
  );
};
export default FeedItem;

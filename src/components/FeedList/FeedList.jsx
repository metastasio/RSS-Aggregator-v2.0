import { useSelector } from 'react-redux';
import FeedItem from '../FeedItem/FeedItem.jsx';

import './FeedList.css';

const FeedList = () => {
  const { feeds } = useSelector((state) => state.input);

  if (feeds.length !== 0) {
    return (
      <div className='feeds'>
        <h4 className='list-title'>Feeds:</h4>
        <ul className='feedlist'>
          {feeds.map((feed) => (
            <FeedItem key={feed.id} {...feed} />
          ))}
        </ul>
      </div>
    );
  }
};
export default FeedList;

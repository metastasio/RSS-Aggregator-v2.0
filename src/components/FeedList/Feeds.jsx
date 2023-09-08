import { useSelector } from 'react-redux';
import Feed from './Feed.jsx';

import './Feeds.css';

const Feeds = () => {
  const feeds = useSelector((state) => state.input.feed);
  if (feeds.length !== 0) {
    return (
      <div className='feeds'>
        <p className='list-title'>Feeds:</p>
        <ul className='feedlist'>
          {feeds.map((feed) => (
            <Feed key={feed.id} {...feed} />
          ))}
        </ul>
      </div>
    );
  }
};
export default Feeds;

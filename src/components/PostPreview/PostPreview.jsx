import { useSelector } from 'react-redux';

import './PostPreview.css';

const PostContent = () => {
  const { preview } = useSelector((state) => state.input);

  if (!preview) {
    return null;
  }
  return (
    <div className='popup'>
      <h5 className='popup-title'>This article is about:</h5>
      <span className='popuptext' id='popup'>
        {preview}
      </span>
    </div>
  );
};
export default PostContent;

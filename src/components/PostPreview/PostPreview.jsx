import { useSelector } from 'react-redux';

import './PostPreview.css';

const PostContent = () => {
  const { preview } = useSelector((state) => state.input);

  if (!preview) {
    return null;
  }
  return (
    <div className='preview'>
      <div className='sticky'>
        <h4 className='preview-title'>This article is about:</h4>
        <p className='preview-text'>
          {preview}
        </p>
      </div>
    </div>
  );
};
export default PostContent;

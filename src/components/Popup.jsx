import { useSelector } from 'react-redux';

import './Popup.css';

const Popup = () => {
  const popupDescription = useSelector((state) => state.input.popup);

  return popupDescription.length !== 0 ? (
    <div className='popup'>
      <p className='popup-title'>This article is about:</p>
      <span className='popuptext' id='popup'>
        {popupDescription}
      </span>
    </div>
  ) : (
    ''
  );
};
export default Popup;

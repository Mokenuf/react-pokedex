import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function NavTitle() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  return (
    <div className='d-flex align-items-center my-2'>
      {!isHome && (
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate('/')} className='me-2' style={{ fontSize: '1.5em', cursor: 'pointer' }} />
      )}
      <h1>Pokedex</h1>
    </div>
  )
}

export default NavTitle;
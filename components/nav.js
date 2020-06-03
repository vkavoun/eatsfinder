import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../redux/store';

function Nav() {
  const dispatch = useDispatch();
  const searchRef = useRef();

  function handleSearchClick() {
    const value = searchRef.current.value.replace(/,/g, '');
    if (value.length > 0) {
      fetch(`http://opentable.herokuapp.com/api/restaurants?city=${value}`).then((response) =>
        response.json().then((data) => {
          const action = {
            type: ActionTypes.FILTER_LOAD,
            lastUpdate: Date.now(),
            currentPage: data.current_page,
            currentFilter: value,
            perPage: data.per_page,
            totalEntries: data.total_entries,
            restaurants: data.restaurants,
          };
          searchRef.current.value = '';
          dispatch(action);
        })
      );
    }
  }

  return (
    <nav className='main-nav'>
      <input className='nav-search' type='text' placeholder='search me...' ref={searchRef}></input>
      <button className='third' onClick={handleSearchClick}>
        Search
      </button>
      <style jsx>
        {`
          button {
            font-weight: 325;
            line-height: 2.8rem;
            outline: none;
            border: 0.1rem solid #d0d0d0;
            border-radius: 0.55rem;
            color: #757575;
            font-weight: 300;
            padding: 0 1rem;
            text-decoration: none;
            place-self: center;
            grid-column: 3;
          }

          button:hover {
            color: #111;
            border-color: #adadad;
          }
        `}
      </style>
    </nav>
  );
}

export default Nav;

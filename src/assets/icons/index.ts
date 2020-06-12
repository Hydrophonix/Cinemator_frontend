// Core
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSun,
    faMoon,
    faCompactDisc,
    faEdit,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

export const initIconsLibrary = () => library.add(faSun, faMoon, faCompactDisc, faEdit, faTrashAlt);

// Add icon objects to library to use in components like that:
// import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// export const Beverage = () => (
//   <div>
//     <FontAwesomeIcon icon="check-square" />
//     Favorite beverage: <FontAwesomeIcon icon="coffee" />
//   </div>
// )

// more https://github.com/FortAwesome/react-fontawesome

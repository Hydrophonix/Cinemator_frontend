// // Core
// import React, { FC } from 'react';

// // Elements
// // Hooks
// // Instruments
// // Types

// // Styles
// import { TableStyles } from './styles';


// export const Table: FC = ({ data, redirectHandler }) => {
//     return (
//         <TableStyles>
//             <Table>
//                 <Thead>
//                     <Tr>
//                         <Th>ID</Th>
//                         <Th>Scene name</Th>
//                         <Th>Location</Th>
//                         <Th>Date</Th>
//                         <Th>Requisite</Th>
//                     </Tr>
//                 </Thead>
//                 <Tbody>
//                     {
//                         data.map((dataItem) => (
//                             <Item
//                                 key = { dataItem.id }
//                                 { ...dataItem }
//                                 redirectHandler = { redirectHandler }
//                             />
//                         ))
//                     }
//                 </Tbody>
//             </Table>
//         </TableStyles>
//     );
// };

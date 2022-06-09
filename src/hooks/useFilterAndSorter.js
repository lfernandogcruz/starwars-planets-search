// import React, { useState, useContext, useEffect } from 'react';
// import PlanetsContext from '../context/PlanetsContext';

// function useFilterAndSorter() {
//   const { data: planets, filters, filteredPlanetList } = useContext(PlanetsContext);

//   useEffect(() => {
//     const finalPlanetList = filters.reduce((acc, filter) => acc.filter((planet) => {
//       switch (filter.comparison) {
//       case 'maior que':
//         return planet[filter.column] > Number(filter.value);
//       case 'menor que':
//         return planet[filter.column] < Number(filter.value);
//       case 'igual a':
//         return planet[filter.column] === Number(filter.value);
//       default:
//         return true;
//       }
//     }), filteredPlanetList);
//   }, []);
// }

// export default useFilterAndSorter;

// import React, { createContext, useContext, useReducer } from 'react';

// const AppContext = createContext();

// const initialState = {
//   user: null,
//   healthData: {
//     femaleHealth: [],
//     maleHealth: [],
//     fitness: [],
//     sleep: [],
//     selfCare: []
//   },
//   communityPosts: [],
//   loading: false
// };

// function appReducer(state, action) {
//   switch (action.type) {
//     case 'SET_LOADING':
//       return { ...state, loading: action.payload };
//     case 'ADD_CYCLE_DATA':
//       return {
//         ...state,
//         healthData: {
//           ...state.healthData,
//           femaleHealth: [...state.healthData.femaleHealth, action.payload]
//         }
//       };
//     case 'ADD_SLEEP_DATA':
//       return {
//         ...state,
//         healthData: {
//           ...state.healthData,
//           sleep: [...state.healthData.sleep, action.payload]
//         }
//       };
//     case 'ADD_COMMUNITY_POST':
//       return {
//         ...state,
//         communityPosts: [action.payload, ...state.communityPosts]
//       };
//     default:
//       return state;
//   }
//   // In your AppContext.jsx, add these cases:
// case 'ADD_MEN_HEALTH_DATA':
//   return {
//     ...state,
//     healthData: {
//       ...state.healthData,
//       maleHealth: [...state.healthData.maleHealth, action.payload]
//     }
//   };

// case 'ADD_FITNESS_DATA':
//   return {
//     ...state,
//     healthData: {
//       ...state.healthData,
//       fitness: [...state.healthData.fitness, action.payload]
//     }
//   };

// case 'ADD_NUTRITION_DATA':
//   return {
//     ...state,
//     healthData: {
//       ...state.healthData,
//       nutrition: [...state.healthData.nutrition, action.payload]
//     }
//   };
// }

// export function AppProvider({ children }) {
//   const [state, dispatch] = useReducer(appReducer, initialState);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useApp must be used within an AppProvider');
//   }
//   return context;
// };
// AppContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

// Create Context
const AppContext = createContext();

// Initial state
const initialState = {
  user: null,
  healthData: {
    femaleHealth: [],
    maleHealth: [],
    fitness: [],
    sleep: [],
    selfCare: [],
    nutrition: []
  },
  communityPosts: [],
  loading: false
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    // Loading
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    // Set user (new login)
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        healthData: {
          femaleHealth: [],
          maleHealth: [],
          fitness: [],
          sleep: [],
          selfCare: [],
          nutrition: []
        },
        communityPosts: []
      };

    // Logout
    case 'LOGOUT':
      return initialState;

    // Female Health
    case 'ADD_CYCLE_DATA':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          femaleHealth: [...state.healthData.femaleHealth, action.payload]
        }
      };

    // Male Health
    case 'ADD_MEN_HEALTH_DATA':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          maleHealth: [...state.healthData.maleHealth, action.payload]
        }
      };

    // Fitness
    case 'ADD_FITNESS_DATA':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          fitness: [...state.healthData.fitness, action.payload]
        }
      };

    // Sleep
    case 'ADD_SLEEP_DATA':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          sleep: [...state.healthData.sleep, action.payload]
        }
      };

    // SelfCare
    case 'ADD_SELFCARE_DATA':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          selfCare: [...state.healthData.selfCare, action.payload]
        }
      };

    // Nutrition
    case 'ADD_NUTRITION_DATA':
      return {
        ...state,
        healthData: {
          ...state.healthData,
          nutrition: [...state.healthData.nutrition, action.payload]
        }
      };

    // Community posts
    case 'ADD_COMMUNITY_POST':
      return {
        ...state,
        communityPosts: [action.payload, ...state.communityPosts]
      };

    default:
      return state;
  }
}

// Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

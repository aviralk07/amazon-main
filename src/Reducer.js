export const initialState = {
  basket: [],
  user: null, // even listener
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "Add_To_Basket":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "Remove_From_Basket":
      const indexToRemove = state.basket.findIndex(
        (item) => item.id === action.id
      );

      if (indexToRemove !== -1) {
        // Make a shallow copy of the basket array
        const newBasket = [...state.basket];

        // Remove the item at the found index
        newBasket.splice(indexToRemove, 1);

        return {
          ...state,
          basket: newBasket,
        };
      }

      // If the item is not found, return the current state
      return state;
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;


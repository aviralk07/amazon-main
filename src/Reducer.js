export const initialState = {
  basket: [],
  user: null, //even listner
};
// Selector
export const getBasketTotal = (basket) =>
  // adding to cart and and price total to cart
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
      const updatedBasket = state.basket.filter(
        (item) => item.id !== action.id
      );
      return {
        ...state,
        basket: updatedBasket,
      };
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

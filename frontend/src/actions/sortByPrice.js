import { SORT_BY_PRICE } from "./constants";

export function sortByPrice(payload) {
  return {
    type: SORT_BY_PRICE,
    payload,
  };
}

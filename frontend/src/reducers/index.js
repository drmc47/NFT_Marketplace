import swal from 'sweetalert';
import {
  GET_NFTs,
  GET_NFT_BY_NAME,
  GET_NFT_BY_ID,
  FILTER_BY_NAME,
  FILTER_BY_CATEGORY,
  SORT_BY_PRICE,
  POST_NFT,
  IS_AUTHENTICATED,
  TRANSACTION_METAMASK,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  ADD_SHOPPING_TROLLEY,
  CONECT_LS,
  GET_CATEGORIES,
  POST_ORDER_SHOPPING_CART,
  GET_ORDER_SHOPPING_CART,
  POST_PROFILE_USER,
  GET_PROFILE_USER,

} from "../actions/constants";

const initialState = {
  allNFTs: [], // all NFTS from API openSea
  filtered: [],
  userIsAuthenticated: [],
  userLogged: null,
  nftDetail: [],
  Nfts: [],
  filters: [
  //   "Funny",
  //   "Animals",
  //   "Sport",
  //   "Music",
  //   "Cute",
  //   "Abstract art",
  //   "Utopy",
  ],
  transactions: [],
  categories: [],
  shoppingTrolley: [],
  shoppingCart: [],
  profileUserData: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NFTs:
      return {
        ...state,
        allNFTs: action.payload,
        filtered: action.payload,
        Nfts: action.payload,
      };
    case GET_NFT_BY_NAME:
      return {
        ...state,
        allNFTs: action.payload,
      };
    case GET_NFT_BY_ID:
      return {
        ...state,
        nftDetail: action.payload,
      };
    case FILTER_BY_NAME:
      const ascDescFilter =
        action.payload === "za"
          ? state.allNFTs.sort((a, b) => {
            if (
              a.name?.charAt(0).toLowerCase() <
              b.name?.charAt(0).toLowerCase()
            )
              return 1;
            return -1;
          })
          : state.allNFTs.sort((a, b) => {
            if (
              a.name?.charAt(0).toLowerCase() >
              b.name?.charAt(0).toLowerCase()
            )
              return 1;
            return -1;
          });
      return {
        ...state,
        allNFTs: [...ascDescFilter],
      };
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case SORT_BY_PRICE:
      const priceFilter =
        action.payload === "max"
          ? [...state.Nfts].sort(
            (b, a) => parseInt(a.price) - parseInt(b.price)
          )
          : [...state.Nfts].sort(
            (b, a) => parseInt(b.price) - parseInt(a.price)
          );
      console.log(priceFilter, priceFilter.length);
      return {
        ...state,
        allNFTs: priceFilter,
      };
    case POST_NFT:
      return {
        ...state,
        allNFTs: [state.allNFTs, action.payload],
      };
    case IS_AUTHENTICATED:
      return {
        ...state,
        userIsAuthenticated: action.payload,
      };
    case TRANSACTION_METAMASK:
      return {
        ...state,
        transactions: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userLogged: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        userLogged: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        userLogged: {
          email: action.payload.email,
          firstName: action.payload.firstName,
        },
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        userLogged: null,
      };
    case ADD_SHOPPING_TROLLEY:
      const myStorage = window.localStorage;
      let getmyStorage = myStorage.getItem('user')
      let parsLocal = JSON.parse(getmyStorage)
      swal({
        title: "¡God Job!",
        text: "¡ Your NFT was successfully added shopping cart !",
        icon: "success",
        button: "OK!",
        timer: 2000
      })
      if (!parsLocal) {
        myStorage.setItem('user', JSON.stringify(state.shoppingTrolley.concat(action.payload)));
        return {
          ...state,
          shoppingTrolley: state.shoppingTrolley.concat(JSON.parse(myStorage.getItem('user')))
        }
      }
      if (parsLocal) {
        console.log("parsLocal", parsLocal)
        let productAction = action.payload._id
        let isrepeat = parsLocal.map(e => e._id).includes(productAction)
        console.log("isrepeat", isrepeat)

        if (isrepeat) {
          swal({
            title: "¡ Sorry =( !",
            text: "¡ This NFT already exists in your shopping cart !",
            icon: "warning",
            button: "OK!",
            timer: 2000
          })
          return {
            ...state
          }
        } else {
          let local = JSON.parse(myStorage.setItem('user', JSON.stringify(JSON.parse(window.localStorage.getItem('user')).concat(action.payload))));
          return {
            ...state,
            shoppingTrolley: local
          }
        }
      }
    case CONECT_LS:
      if (!window.localStorage.getItem('user')) {
        return {
          ...state,
          shoppingTrolley: state.shoppingTrolley
        }
      } else {
        return {
          ...state,
          shoppingTrolley: JSON.parse(window.localStorage.getItem('user'))
        }
      }
      case GET_CATEGORIES:
        return{
          ...state,
          filters:state.filters.concat(payload)

        }
    case POST_ORDER_SHOPPING_CART:
      return {
        ...state,
        shoppingTrolley: action.payload,
      }
    case GET_ORDER_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: action.payload,
      }
    case POST_PROFILE_USER:
      return {
        ...state,
        profileUser: action.payload,
      }
  
    case GET_PROFILE_USER:
      return {
        ...state,
        profileUserData: action.payload,
      }
    default:
      return state;
  }
}

export default rootReducer;

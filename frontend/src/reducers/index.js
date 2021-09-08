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
} from '../actions/constants'

const initialState = {
  allNFTs: [], // all NFTS from API openSea
  filtered: [],
  userIsAuthenticated: [],
  userLogged: null,
  nftDetail: [],
  Nfts: [],
  filters: ['Funny', 'Animals', 'Sport', 'Music','Cute', 'Abstract art','Utopy'],
  transactions: [],
  categories: [
    'superrare',
    'art-blocks',
    'decentraland',
    'makersplace',
    'rarible',
    'godsunchained',
    'autoglyphs',
    'cryptokitties',
  ],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NFTs:
      return {
        ...state,
        allNFTs: action.payload,
        filtered: action.payload,
        Nfts: action.payload,
      }
    case GET_NFT_BY_NAME:
      return {
        ...state,
        allNFTs: action.payload,
      }
    case GET_NFT_BY_ID:
      return {
        ...state,
        nftDetail: action.payload,
      }
    case FILTER_BY_NAME:
      const ascDescFilter =
        action.payload === 'za'
          ? state.allNFTs.sort((a, b) => {
              if (
                a.name?.charAt(0).toLowerCase() <
                b.name?.charAt(0).toLowerCase()
              )
                return 1
              return -1
            })
          : state.allNFTs.sort((a, b) => {
              if (
                a.name?.charAt(0).toLowerCase() >
                b.name?.charAt(0).toLowerCase()
              )
                return 1
              return -1
            })
      return {
        ...state,
        allNFTs: [...ascDescFilter],
      }
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        allNFTs: action.payload,
      }
    case SORT_BY_PRICE:
      const priceFilter =
        action.payload === 'max'
          ? [...state.Nfts].sort(
              (b, a) => parseInt(a.price) - parseInt(b.price)
            )
          : [...state.Nfts].sort(
              (b, a) => parseInt(b.price) - parseInt(a.price)
            )
      console.log(priceFilter, priceFilter.length)
      return {
        ...state,
        allNFTs: priceFilter,
      }
    case POST_NFT:
      return {
        ...state,
        allNFTs: [state.allNFTs, action.payload],
      }
    case IS_AUTHENTICATED:
      return {
        ...state,
        userIsAuthenticated: action.payload,
      }
    case TRANSACTION_METAMASK:
      return {
        ...state,
        transactions: action.payload,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        userLogged: action.payload,
      }
    case LOGOUT:
      return {
        ...state,
        userLogged: null,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        userLogged: {
          email: action.payload.email,
          firstName: action.payload.firstName,
        },
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        userLogged: null,
      }
    default:
      return state
  }
}

export default rootReducer
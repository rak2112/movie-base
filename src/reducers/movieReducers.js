export const getGenres = (state = {genres:[]}, action) => {
  switch (action.type) {
    case 'LOADING_GENRE':
      return {...state, genres:action.res.genres};
    default: return state;
  }
};
const initialStateDetails = {
  errorDetails: false,
  fetchingDetails:true,
  fetchingVideos: true,
  fetchingCast:true,
  fetchingImgs:true,
  showModal:false,
  utubeKey:null,
  details:{},
  videos:{},
  images:[]
};
export const getDetails = (state = initialStateDetails , action) => {
  switch (action.type) {
    case 'LOADING_REQ':
      return {...state, fetchingDetails:true, fetchingVideos: true, fetchingCast:true, fetchingImgs:true};
    case 'ERROR_DETAILS':
      return {...state, errorDetails: true};
    case 'DETAILS_LOADED':
      return {
        ...state,
        fetchingDetails: false,
        details: action.res
      };
    case 'LOAD_VIDEOS':
      return {
        ...state,
        fetchingVideos: false,
        videos: action.res
      };
    case 'LOAD_IMAGES':
      return {
        ...state,
        fetchingCast:false,
        images: action.res
      };
    case 'LOAD_CAST':
      return {
        ...state,
        fetchingImgs:false,
        castCrew: action.res
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        showModal: true,
        utubeKey: action.key
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        showModal: false
      };
    default :
        return state;
  }
};

const initialStateMovies = {isFetching:true, hasError: false, pageNo:1, totalPages: 1, items: [], totalItems:[]};
export const movies = ( state = initialStateMovies, action) => {
  switch (action.type) {
    case 'LOADING_REQ':
      return {
        ...state,
        isFetching: true
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        hasError: true,
        isFetching: false,
        errorStatus: action.res.message
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        isFetching: false,
        hasError: false,
        pageNo: action.pageNo,
        totalItems: action.res['total_results'],
        totalPages:action.res['total_pages'],
        items: action.res['results']
      };
    default :
      return state;
  }
};

const moviesFound = {moviesFound:[]};
export const searchedMovies = (state = moviesFound, action) => {
  switch(action.type) {
    case 'MOVIES_SEARCHED':
      return {
        ...state,
        moviesFound: action.res
      };
    case 'RESET_QUICK_SEARCH':
      return {
        ...state,
        moviesFound:[]
      };
    default:
      return state;
  }
};

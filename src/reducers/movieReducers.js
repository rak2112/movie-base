export function getGenres (state = {genres:[]}, action) {
    switch (action.type) {
        case 'LOADING_GENRE':
        return Object.assign({}, state, {genres: action.res.genres});
        default: return state;
    }
}
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
export function getDetails (state = initialStateDetails , action) {
    switch (action.type) {
        case 'UN_LOAD':
            return Object.assign({}, state, initialStateDetails);
        case 'ERROR_DETAILS':
            return Object.assign({}, state, { errorDetails: true});
        case 'LOADING_DETAILS':
            return Object.assign({}, state, { fetchingDetails: false,  details: action.res});
        case 'LOAD_VIDEOS':
            return Object.assign({}, state, { fetchingVideos: false, videos: action.res });
        case 'LOAD_IMAGES':
            return Object.assign({}, state, { fetchingCast:false, images: action.res });
        case 'LOAD_CAST':
            return Object.assign({}, state, { fetchingImgs:false, castCrew: action.res });
        case 'OPEN_MODAL':
            return Object.assign({}, state, { showModal: true, utubeKey: action.key});
        case 'CLOSE_MODAL':
            return Object.assign({}, state, { showModal: false});
        default :
            return state;
    }
}

const initialStateMovies = {isFetching:true, hasError: false, pageNo:1, totalPages: 1, items: [], totalItems:[]};
export function movies( state = initialStateMovies, action){
    switch (action.type) {
        case 'LOADING_REQ':
            return Object.assign({}, state, {
              isFetching: true
            });
        case 'LOAD_ERROR':
            return Object.assign({}, state, {
              hasError: true,
              isFetching: false,
              errorStatus: action.res.message
            });
        case 'LOAD_SUCCESS':
            return Object.assign({}, state, {
              isFetching: false,
              hasError: false,
              pageNo: action.pageNo,
              totalItems: action.res['total_results'],
              totalPages:action.res['total_pages'],
              items: action.res['results']
           });
        default :
            return state;
    }
}

const moviesFound = {moviesFound:[]};
export function searchedMovies (state = moviesFound, action) {
  switch(action.type) {
    case 'MOVIES_SEARCHED':
      return Object.assign({}, state, {
        moviesFound: action.res
      });
    case 'RESET_QUICK_SEARCH':
      return Object.assign({}, state, {
        moviesFound: []
      }); 
    default:
      return state;
  }
}

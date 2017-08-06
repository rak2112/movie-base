import { paths } from './../constants/locationSvc';
import toFromDates from './../utils/toFromDates';
export function movieSearched (res) {
  return { type: 'MOVIES_SEARCHED', res};
}

export function resetQuickSearch () {
  return { type: 'RESET_QUICK_SEARCH'};
}

export function loadSuccess (res, pageNo) {
  return { type: 'LOAD_SUCCESS', res, pageNo};
}
export function loadError (res) {
  return { type: 'LOAD_ERROR', res};
}

export function errorDetails (res) {
  return { type: 'ERROR_DETAILS', res};
}

export function loadFailure (text) {
  return { type: 'LOAD_FAILURE', text};
}

export function loadingReq (res) {
  return { type: 'LOADING_REQ', res};
}

export function loadGenre (res) {
  return { type: 'LOADING_GENRE', res};
}

export function loadSuccessDetails (res) {
  return { type: 'LOADING_DETAILS', res};
}

export function loadVideoDetails (res) {
  return { type: 'LOAD_VIDEOS', res};
}

export function loadImages (res) {
  return { type: 'LOAD_IMAGES', res};
}

export function loadCast (res) {
  return { type: 'LOAD_CAST', res};
}

export function loadPage (pageNo) {
  return { type: 'PAGE_CHANGE', pageNo};
}
export function openModal (key) {
  return { type: 'OPEN_MODAL', key };
}
export function closeModal () {
  return { type: 'CLOSE_MODAL' };
}

export function unLoad () {
  return { type: 'UN_LOAD'};
}

let checkStatus = (response) => {
    if (response.status === 200) {
        return Promise.resolve(response.json());
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};

async function syncLoad(url) {
  const res = await fetch(url);
  return checkStatus(res);
}

export function loadGenres () {
  return async dispatch => {
    try {
      let url = `${paths.apiUrl}/genre/movie/list${paths.apiKey}`;
      const res = await syncLoad(url);
      dispatch(loadGenre(res));
    }
    catch(e) {
      dispatch(loadError(e));
    }
  };
}

export function searchMovies(movie) {
  return async (dispatch) => {
    try {
      let url = `${paths.apiUrl}/search/multi${paths.apiKey}&language=en-US&query=${movie}`;
      const res = await syncLoad(url);
      let data = res.results;
      data.map((movie)=> {
        if(movie.release_date) {
          movie.releaseYear = new Date(movie.release_date).getFullYear();
        }
      });
      let movies = data.filter((movie)=> movie.media_type === 'movie');
      dispatch(movieSearched(movies, 1));
    }
    catch(e) {
      dispatch(loadError(e));
    }
  };
}

export function loadMovies (pageNumb) {
  return async (dispatch) => {
    try {
      let url = `${paths.apiUrl}/discover/movie${paths.apiKey}&page=${pageNumb}`;
      const res = await syncLoad(url);
      dispatch(loadSuccess(res, pageNumb));
    }
    catch(err) {
      dispatch(loadError(err));
    }
  };
}

export function getMoviesDetails (id) {
  return (dispatch) => {
    let details = fetch(`${paths.apiUrl}/movie/${id}${paths.apiKey}`).then(checkStatus);
    let videos = fetch(`${paths.apiUrl}/movie/${id}/videos${paths.apiKey}`).then(checkStatus);
    let images = fetch(`${paths.apiUrl}/movie/${id}/images${paths.apiKey}`).then(checkStatus);
    let casts = fetch(`${paths.apiUrl}/movie/${id}/casts${paths.apiKey}`).then(checkStatus);
    Promise.all([details, videos, images, casts])
      .then((res) => {
        let posters =  (res[2].posters < 6) ? res[2].posters : res[2].posters.slice(0, 5);
        dispatch(loadImages(posters));
        dispatch(loadSuccessDetails(res[0]));
        dispatch(loadVideoDetails(res[1]));
        dispatch(loadCast(res[3]));
      })
      .catch((err)=>{
        dispatch(errorDetails(err));
      });
  };
}

export function getVideoDetails (id) {
  return async dispatch => {
    try {
      let url = `${paths.apiUrl}/movie/${id}/videos'${paths.apiKey}`;
      const res = await syncLoad(url);
      dispatch(loadVideoDetails(res));
    }
    catch(err) {
      dispatch(loadError(err));
    }
  };
}

export function getLatest (pageNumber) {
  let {toDate, fromDate} = toFromDates();
  return async dispatch => {
    try {
      const res = await syncLoad(`${paths.apiUrl}/discover/movie?primary_release_date.gte=${toDate}&primary_release_date.lte=${fromDate}&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNumber}`);
      dispatch(loadSuccess(res, pageNumber));
    }
    catch(err) {
      dispatch(loadError(err));
    }
  };
}

export function getPopular (pageNo) {
  return async dispatch => {
    try {
      const res = await syncLoad(`${paths.apiUrl}/discover/movie?sort_by=vote_average.desc&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=${pageNo}`);
      dispatch(loadSuccess(res, pageNo));
    }
    catch(err) {
      dispatch(loadError(err));
    }
  };
}

export function getUpComing (pageNo) {
  return async dispatch => {
    try {
      const res = await syncLoad(`${paths.apiUrl}/movie/upcoming${paths.apiKey}&page=${pageNo}`);
      dispatch(loadSuccess(res, pageNo));
    }
    catch(err) {
      dispatch(loadError(err));
    }
  };
}


export function getMovies(pageNo, route, dispatch) {
  switch (route) {
    case 'movies':
      dispatch(loadMovies(pageNo));
      dispatch(loadGenres());
      break;
    case 'latest':
      dispatch(getLatest(pageNo));
      dispatch(loadGenres());
      break;
    case 'popular':
      dispatch(getPopular(pageNo));
      break;
    case 'upComing':
      dispatch(getUpComing(pageNo));
      break;
    default:
      dispatch(loadMovies(pageNo));
  }
}

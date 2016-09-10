/**
 * Created by kraja2 on 26/04/2016.
 */
import $ from 'jquery';
import { paths } from './../constants/locationSvc';


export function loadSuccess (res, pageNo) {
  return { type: 'LOAD_SUCCESS', res, pageNo};
}
export function loadError (res) {
  return { type: 'LOAD_ERROR', res};
}

export function loadFailure (text) {
  return { type: 'LOAD_FAILURE', text};
}

export function loadingReq (text) {
  return { type: 'LOADING_REQ', text};
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

export function loadGenres () {
  return (dispatch) => {
    $.ajax({
      //url:'https://api.themoviedb.org/3/discover/movie?api_key=60773f18ef6a7a9ee3d4a640fab964eb&primary_release_date.gte=2015-01-01&primary_release_date.lte=2015-08-31&page=1',
      url: paths.apiUrl + '/genre/movie/list' + paths.apiKey,
      method:'GET'
    }).done(function(res){
      dispatch(loadGenre(res));
    }).fail(function(){

    });
  };
}

export function loadMovies (pageNumb) {
  return (dispatch) => {
    $.ajax({
      url: paths.apiUrl +  '/discover/movie' + paths.apiKey + '&page=' + pageNumb,
      method:'GET'
    }).done(function(res){
      dispatch(loadSuccess(res, pageNumb));
    }).fail(function(err) {
      dispatch(loadError(err));
    });
  };
}

export function getMoviesDetails (id) {
  return (dispatch) => {
    let details = $.get(paths.apiUrl +  '/movie/' + id + paths.apiKey);
    let videos = $.get(paths.apiUrl +  '/movie/' + id + '/videos'+ paths.apiKey);
    let images = $.get(paths.apiUrl +  '/movie/' + id + '/images'+ paths.apiKey);
    let casts = $.get(paths.apiUrl +  '/movie/' + id + '/casts'+ paths.apiKey);
    $.when(details, videos, images, casts)
      .done(function(det, vid, imgs, cast) {
        let posters =  (imgs[0].posters < 6) ? imgs[0].posters : imgs[0].posters.slice(0, 5);
        dispatch(loadImages(posters));
        dispatch(loadSuccessDetails(det[0]));
        dispatch(loadVideoDetails(vid[0]));
        dispatch(loadCast(cast[0]));
      });
  };
}

export function getVideoDetails (id) {
  return (dispatch) => {
    $.ajax({
      url: paths.apiUrl +  '/movie/' + id + '/videos'+ paths.apiKey,
      method:'GET'
    }).done(function(res){
      dispatch(loadVideoDetails(res));
      // console.log('ressssssssssssssssss',res);
    }).fail(function(err) {
      dispatch(loadError(err));
    });
  };
}

export function getLatest (pageNumb) {
  let d = new Date();
  let dd = d.getDate();
  let mm = d.getMonth()+ 1;
  let yy = d.getFullYear();
  let fromDate = yy + '-' + mm + '-' + dd;
  let lastDay = dd-1;
  lastDay = (lastDay) ? lastDay : lastDay+1;
  let toDate = yy + '-' + (mm-1) + '-' + lastDay;
  return (dispatch) => {
    $.ajax({
      url: paths.apiUrl + '/discover/movie?primary_release_date.gte='+ toDate + '&primary_release_date.lte=' + fromDate + '&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=' + pageNumb,
      method:'GET'
    }).done(function(res){
      dispatch(loadSuccess(res, pageNumb));
    }).fail(function(err) {
      dispatch(loadError(err));
    });
  };
}

export function getPopular (pageNo) {
  return (dispatch) => {
    $.ajax({
      url: paths.apiUrl + '/discover/movie?sort_by=vote_average.desc&api_key=60773f18ef6a7a9ee3d4a640fab964eb&page=' + pageNo,
      method:'GET'
    }).done(function(res){
      dispatch(loadSuccess(res));
    }).fail(function(err) {
      dispatch(loadError(err));
    });
  };
}

export function getUpComing (pageNo) {
  return (dispatch) => {
    $.ajax({
      url: paths.apiUrl + '/movie/upcoming'+ paths.apiKey + '&page=' + pageNo,
      method:'GET'
    }).done(function(res){
      dispatch(loadSuccess(res));
    }).fail(function(err) {
      dispatch(loadError(err));
    });
  };
}


export function getMovies(pageNo, route, dispatch) {
  console.log('route', route);
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

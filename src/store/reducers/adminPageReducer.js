
import axios from 'axios';
const API = process.env.API_URL || 'https://trader401.herokuapp.com';
const initState = {
  adminPost: [],
};

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'GETPOST':
    return {
      ...state,
      adminPost: payload,
    };
  case 'PUTPOST':
    let adminPost = state.adminPost.map((post) =>
      post._id === payload._id ? payload : post);
    return {
      ...state,
      adminPost: adminPost,
    };
  default:
    return state;
  }
};

export const statusPost = (token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
  axios.get(`${API}/status`, options)
    .then(res => {
      dispatch(getAdminPost(res.data.results)); 
    })
    .catch(e => {
      console.log('ERROR GET POSTS');
      console.error();
    });
};


export const changeStatus = (id, newPost, token) => dispatch => {
  console.log('newPost >>>>', newPost);
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
  axios.put(`${API}/status/${id}`, newPost, options)
    .then(res => {
      dispatch(updatePost(res.data));
      console.log('Post Updated');
    })
    .catch(e => {
      console.log('ERROR UPDATE POSTS');
      console.error();
    });
};

export const getPost = (id,token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    cache: 'no-cache',
  };
  axios.get(`${API}/status/${id}`, options)
    .then(res => {
      console.log('res from onePostAdmin >>>>', res);
      dispatch(getAdminPost(res.body));
      console.log('Post Updated');
    })
    .catch(e => {
      console.log('ERROR UPDATE POSTS');
      console.error();
    });
};

export const getAdminPost = (post) => {
  return {
    type: 'GETPOST',
    payload: post,
  };
};
export const updatePost = (post) => {
  return {
    type: 'PUTPOST',
    payload: post,
  };
};
export const getOnePost = (post) => {
  return {
    type: 'GETONEPOST',
    payload: post,
  };
};

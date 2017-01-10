import {
  GET_FILE_LIST,
  UPDATE_MD_CONTENT,

  START_MD_UPDATE_CONTENT,
  FINISH_MD_UPDATE_CONTENT,

  EDITOR_CHANGE_HEADER,
  EDITOR_CHANGE_CONTENT,
  EDITOR_CHANGE_RENDER,
  EDITOR_COMPLETE,

  TOGGLE_EDIT

} from './action-types';


export const fileInitialState = {
  key: null,
  status: "INITIAL",
  content: null,
};


export function fileReducer( state=fileInitialState, action ){
  switch (action.type) {
    case START_MD_UPDATE_CONTENT:
      if (state.key != action.payload.id){
        return state
      }else{
        return Object.assign({}, state,  {status: "ONGOING"})
      }

    case FINISH_MD_UPDATE_CONTENT:
      if (state.key != action.payload.key){
        return state
      }else{
        return Object.assign({}, state, {status: "IDLE", content: action.payload.content})
      }

    case EDITOR_CHANGE_CONTENT:
      if (state.key != action.payload.key){
        return state
      }else{
        return Object.assign({}, state, { status: "EDIT", content: action.payload.content})
      }

    case EDITOR_COMPLETE:
      if (state.key != action.payload.key){
        return state
      }else{
        return Object.assign({}, state, { status: "IDLE"})
      }


    case EDITOR_CHANGE_HEADER:
      if (state.key != action.payload.key){
        return state
      }else{
        return Object.assign({}, state, {header: action.payload.header})
      }

    default: 
      return state
  }
}


export const articlesInitialState = {
  articles: [],
  onEdit: true,
};

export function mdReducer(state = articlesInitialState, action) {

  switch (action.type) {
    case GET_FILE_LIST: // only when init
      return Object.assign({}, state, {articles: 
                           Object.keys(action.payload).map(i=>(action.payload[i]))}
                          )

    case START_MD_UPDATE_CONTENT:
      return  Object.assign({}, state, {articles:state.articles.map(i=>fileReducer(i, action))})

    case FINISH_MD_UPDATE_CONTENT:
      return  Object.assign({}, state, {articles: state.articles.map(i=>fileReducer(i, action))})

    case EDITOR_CHANGE_HEADER:
      return  Object.assign({}, state, {articles: state.articles.map(i=>fileReducer(i, action))})

    case EDITOR_CHANGE_CONTENT:
      return  Object.assign({}, state, {articles: state.articles.map(i=>fileReducer(i, action))})

    case EDITOR_COMPLETE:
      return  Object.assign({}, state, {articles: state.articles.map(i=>fileReducer(i, action))})

    case TOGGLE_EDIT:
      return  Object.assign({}, state, {onEdit: !state.onEdit})

    default:
      return state
  }
}

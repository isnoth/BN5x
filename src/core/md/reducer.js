import {
  UPDATE_FILE_LIST,
  UPDATE_MD_CONTENT,

  START_MD_UPDATE_CONTENT,
  FINISH_MD_UPDATE_CONTENT,

  EDITOR_CHANGE_HEADER,
  EDITOR_CHANGE_CONTENT,
  EDITOR_CHANGE_RENDER

} from './action-types';


export const fileInitialState = {
  key: null,
  status: "IDLE",
  content: null,
};


export function fileReducer( state=fileInitialState, action ){
  switch (action.type) {
    case START_MD_UPDATE_CONTENT:
      if (state.key == action.payload.id){
        return {...state, status: "ONGOING"}
      }

    case FINISH_MD_UPDATE_CONTENT:
      if (state.key != action.payload.key){
        return state
      }else{
        return {key: action.payload.key, status: "DONE", content: action.payload.content}
      }

    case EDITOR_CHANGE_CONTENT:
      if (state.key != action.payload.key){
        return state
      }else{
        return {key: action.payload.key, status: "EDIT", content: action.payload.content}
      }

    default: 
      return state
  }
}

export const editorInitialState = {
  header: "",
  content: ""
}

export function editorReducer( state, action ){

  switch (action.type) {
    case EDITOR_CHANGE_HEADER:
      return  Object.assign({}, state, {header: action.payload})

    case EDITOR_CHANGE_CONTENT:
      return  Object.assign({}, state, {content: action.payload})

    case EDITOR_CHANGE_RENDER:
      return  Object.assign({}, state, {render: action.payload})

    default:
      return state
  }
}



export const articlesInitialState = {
  articles: [],
  editor: editorInitialState
};

export function mdReducer(state = articlesInitialState, action) {

  switch (action.type) {
    case UPDATE_FILE_LIST: // only when init
      return Object.assign({}, state, {articles: action.payload.map(i=>({key: i}))})

    case START_MD_UPDATE_CONTENT:
      return  Object.assign({}, state, {articles:state.articles.map(i=>fileReducer(i, action))})

    case FINISH_MD_UPDATE_CONTENT:
      return  Object.assign({}, state, {articles: state.articles.map(i=>fileReducer(i, action))})

    case EDITOR_CHANGE_HEADER:
      return  Object.assign({}, state, {editor:editorReducer(state.editor, action)})

    case EDITOR_CHANGE_CONTENT:
      return  Object.assign({}, state, {articles: state.articles.map(i=>fileReducer(i, action))})

    case EDITOR_CHANGE_RENDER:
      return  Object.assign({}, state, {editor:editorReducer(state.editor, action)})

    default:
      return state
  }
}

import { call, put, takeEvery } from "redux-saga/effects"
import { GET_EBOOKS , POST_EBOOK} from './actionTypes'
import  {getEbooksSuccess , getEbooksFailure,
            postEbookSuccess,postEbookFailure } from './actions'

import {postEbook, getEbooks} from '../../../helpers/backend-helpers'

function* getEbooksHttp(){
    try {
        const response = yield call(getEbooks);
        if (response) {
          yield put(getEbooksSuccess(response))
          return;
        }
        throw "Unknown response received from Server";
    
      } catch (error) {
        yield put(getEbooksFailure(error))
      }
}


function* postEbookHttp({payload:{data}}) {
    try {
      console.log("CHECK DATA HERE ==>", data)
      const response = yield call(postEbook , data);
      if (response) {
        yield put(postEbookSuccess(response))
        return;
      }
      throw "Unknown response received from Server";
  
    } catch (error) {
      yield put(postEbookFailure(error))
    }
  }



function* EbookSaga() {
    yield takeEvery(GET_EBOOKS, getEbooksHttp)
    yield takeEvery(POST_EBOOK, postEbookHttp)
  }
  
  export default EbookSaga
  
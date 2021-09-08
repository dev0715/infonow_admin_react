import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { GET_STUDENTS_STATS,
         GET_STUDENT_DETAILS ,
         GET_ALL_STUDENTS ,
         GET_STUDENT_NEW_OR_WAITING_STATUS,} from "./actionTypes"
import {
    getStudentsStatsSuccess, getStudentsStatsFailure,
    getStudentDetailsSuccess, getStudentDetailsFailure,
    getAllStudentsSuccess, getAllStudentsFailure,
    getStudentNewOrWaitingStatusSucces, getStudentNewOrWaitingStatusFailure
} from "./actions"

//Include Both Helper File with needed methods
import { getStudentsStats, getStudent , getAllStudents , getStudentOfStatusNewOrWaiting } from "../../../helpers/backend-helpers";


function* getStudentsStatsHttp() {
    try {
        const response = yield call(getStudentsStats);
        if (response) {
            yield put(getStudentsStatsSuccess(response))
            return;
        }
        throw "Unknown response received from Server";

    } catch (error) {
        yield put(getStudentsStatsFailure(error.message ? error.message : error))
    }
}

function* getStudentDetailsHttp({ payload }) {
    try {
        const response = yield call(getStudent, payload);
        if (response) {
            yield put(getStudentDetailsSuccess(response))
            return;
        }
        throw "Unknown response received from Server";

    } catch (error) {
        yield put(getStudentDetailsFailure(error.message ? error.message : error))
    }
}

function* getAllStudentsHttp() {
    try {
        const response = yield call(getAllStudents);
        if (response) {
            yield put(getAllStudentsSuccess(response))
            return;
        }
        throw "Unknown response received from Server";

    } catch (error) {
        yield put(getAllStudentsFailure(error.message ? error.message : error))
    }
}

function* getStudentsNewOrWaitingStatusHttp() {
    try {
        const response = yield call(getStudentOfStatusNewOrWaiting);
        if (response) {
            yield put(getStudentNewOrWaitingStatusSucces(response))
            return;
        }
        throw "Unknown response received from Server";

    } catch (error) {
        yield put(getStudentNewOrWaitingStatusFailure(error.message ? error.message : error))
    }
}



function* StudentsSaga() {
    yield takeEvery(GET_STUDENTS_STATS, getStudentsStatsHttp)
    yield takeEvery(GET_STUDENT_DETAILS, getStudentDetailsHttp)
    yield takeEvery(GET_ALL_STUDENTS, getAllStudentsHttp)
    yield takeEvery(GET_STUDENT_NEW_OR_WAITING_STATUS, getStudentsNewOrWaitingStatusHttp)
}

export default StudentsSaga

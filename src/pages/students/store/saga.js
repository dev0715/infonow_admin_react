import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { GET_STUDENTS_STATS, GET_STUDENT_DETAILS } from "./actionTypes"
import {
    getStudentsStatsSuccess, getStudentsStatsFailure,
    getStudentDetailsSuccess, getStudentDetailsFailure
} from "./actions"

//Include Both Helper File with needed methods
import { getStudentsStats, getStudent } from "../../../helpers/backend-helpers";


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


function* StudentsSaga() {
    yield takeEvery(GET_STUDENTS_STATS, getStudentsStatsHttp)
    yield takeEvery(GET_STUDENT_DETAILS, getStudentDetailsHttp)
}

export default StudentsSaga

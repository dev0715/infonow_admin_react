import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { GET_STUDENTS, GET_STUDENT_DETAILS } from "./actionTypes"
import {
    getStudentsSuccess, getStudentsFailure,
    getStudentDetailsSuccess, getStudentDetailsFailure
} from "./actions"

//Include Both Helper File with needed methods
import { getLoggedInUser, getStudents, getStudent } from "../../../helpers/backend-helpers";


function* getStudentsHttp() {
    try {
        let user = getLoggedInUser()
        const response = yield call(getStudents, user.userId);
        if (response) {
            yield put(getStudentsSuccess(response))
            return;
        }
        throw "Unknown response received from Server";

    } catch (error) {
        yield put(getStudentsFailure(error.message ? error.message : error))
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
    yield takeEvery(GET_STUDENTS, getStudentsHttp)
    yield takeEvery(GET_STUDENT_DETAILS, getStudentDetailsHttp)
}

export default StudentsSaga

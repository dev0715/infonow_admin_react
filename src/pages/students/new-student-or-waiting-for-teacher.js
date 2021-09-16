import React, { useEffect } from 'react';
// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import {
    Card, CardBody, Row, Col,
} from 'reactstrap'


// ** Store & Actions
import { connect } from 'react-redux'

import { withRouter } from 'react-router';
import {
    getStudentNewOrWaitingStatus
} from './store/actions'


import UILoader from '../../@core/components/ui-loader';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './style.scss'

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';
import StudentList from './student-list';

const NewStudentsOrWaitingForTeachers = (props) => {

    const {  waitingOrNewStudents,
        waitingOrNewStudentsLoading,
        waitingOrNewStudentsError, } = props

    useEffect(() => {
        props.getStudentNewOrWaitingStatus()
    }, [])

    const onSelect = (student) => {
        props.history.push({
            pathname: `/assign-unassign-teacher`,
            state: { user: student, isTeacher: true }
        })
    }


    return (
        <Fragment >
            <UILoader
                blocking={waitingOrNewStudentsLoading}>
                <Card>
                    <CardBody >
                        <Row className="d-flex align-items-center">
                            <Col sm='6'>
                                <h4 className="m-0">
                                    New or waiting for teachers
                                </h4>
                            </Col>
                        </Row>


                        <div className="shadow-stats-item mt-3">
                            {
                                !waitingOrNewStudentsLoading &&
                                waitingOrNewStudentsError &&
                                <NoNetwork message={waitingOrNewStudentsError} />
                            }

                            {
                                !waitingOrNewStudentsLoading &&
                                !waitingOrNewStudentsError &&
                                waitingOrNewStudents &&
                                waitingOrNewStudents.data &&
                                waitingOrNewStudents.data.length == 0 &&
                                <NotFound message="No student found" />
                            }

                            {
                                !waitingOrNewStudentsLoading &&
                                !waitingOrNewStudentsError &&
                                waitingOrNewStudents &&
                                waitingOrNewStudents.data &&
                                waitingOrNewStudents.data.length > 0 &&

                                <StudentList
                                    isNew={true}
                                    dataList={waitingOrNewStudents.data}
                                    onSelect={onSelect}
                                />
                            }
                        </div>
                    </CardBody>
                </Card>
            </UILoader >
        </Fragment >
    )
}

const mapStateToProps = (state) => {

    const {
        waitingOrNewStudents,
        waitingOrNewStudentsLoading,
        waitingOrNewStudentsError,

    } = state.Students

    return {
        waitingOrNewStudents,
        waitingOrNewStudentsLoading,
        waitingOrNewStudentsError,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getStudentNewOrWaitingStatus
    })(NewStudentsOrWaitingForTeachers)
)

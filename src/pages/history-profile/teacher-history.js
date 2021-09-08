
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getTeacherHistoryStats } from '@store/actions'
import HistoryList from './history-list'

import { ArrowLeft} from 'react-feather'
import { Card, Row, Col, Button } from 'reactstrap'
import ProfileDetail from './profile-detail'

export const TeacherHistory = (props) => {

    const [students, setStudents] = useState([])
    const [user, setUser] = useState(null)

    const { teacherHistory, teacherHistoryLoading } = props
    let teacherId = props.match.params.teacherId;

    const fetchTeacherHistory = () => {
        props.getTeacherHistoryStats(teacherId);
    }

    const studentsOfTeacher = () => {

        if (teacherHistory && teacherHistory.history && teacherHistory.history.data.length > 0) {

            setUser(teacherHistory.history.data[0].teacher.user)
            let studentData = []
            teacherHistory.history.data.forEach(e => {
                studentData.push(e.student.user)
            })
            setStudents(studentData)
        }

    }

  

    useEffect(() => {
        fetchTeacherHistory();
    }, [])

    useEffect(() => {
        studentsOfTeacher();
    }, [teacherHistory])

    return (
        <>
            <Row className="mb-2">
                <Col md="6">
                    <Button.Ripple className="btn-icon" size="sm" onClick={() => props.history.goBack()}><ArrowLeft size={16} /></Button.Ripple>
                    <h3 className='ml-2 d-inline m-0'>Teacher profile</h3>
                </Col>
            </Row>

            <Row>
                <Col md="9">
                    {
                        students &&
                        <HistoryList
                            users={students}
                            isTeacher={true}
                            fetchHistory={fetchTeacherHistory}
                            isReloading={teacherHistoryLoading}
                            onBack={props.onBack} />
                    }
                </Col>
                <Col md="3">
                    {
                        user &&
                        <ProfileDetail user={user} />
                    }

                </Col>
            </Row>

        </>

    )
}

TeacherHistory.propTypes = {
    onSelect: PropTypes.func,
    onBack: PropTypes.func
}


const mapStateToProps = (state) => {
    const { teacherHistory, teacherHistoryLoading, teacherHistoryError } = state.History;
    return { teacherHistory, teacherHistoryLoading, teacherHistoryError };
}

const mapDispatchToProps = {
    getTeacherHistoryStats
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeacherHistory))

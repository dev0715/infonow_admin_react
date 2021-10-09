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
    getStudentsStats
} from './store/actions'

import { useTranslation } from 'react-i18next'
import UILoader from '../../@core/components/ui-loader';

import { StatsItemCard } from '../../views/stats-item-card'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './style.scss'

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';
import StudentList from './student-list';

const ActiveStudents = (props) => {

    const { studentStats,
        studentStatsError,
        studentStatsLoading, } = props
  
    // console.log("CHECK b ==>", useTranslation());
    const { t } = useTranslation()
    // console.log("CHECK a ==>", t);

    useEffect(() => {
        props.getStudentsStats()
    }, [])

    const onSelect = (student) => {
        props.history.push({
            pathname: `/assign-unassign-teacher`,
            state: { user: student, isTeacher: true }
        })
    }

    const handleViewStudent = (id) => {
        props.history.push(`/student-history/${id}`)
    }



    return (
        <Fragment >
            <UILoader
                blocking={props.studentsLoading}
            >
                <Card>
                    <CardBody >
                        <Row className="d-flex align-items-center">
                            <Col sm='6'>
                                <h4 className="m-0">
                                    {t("Students")}
                                </h4>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={`${t('Students')} January`}
                                    value={studentStats.thisMonthCount}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={`${t('Students')} 2021`}
                                    value={studentStats.thisYearCount}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={`${t('Students')} ${t('All')}`}
                                    value={studentStats.allTimeCount}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={`${t('Students')} ${t('Active')}`}
                                    value={studentStats.activeCount}
                                />
                            </Col>
                        </Row>

                        <div className="shadow-stats-item mt-3">
                            {
                                !studentStatsLoading &&
                                studentStatsError &&
                                <NoNetwork message={studentStatsError} />
                            }

                            {
                                !studentStatsLoading &&
                                !studentStatsError &&
                                studentStats.students &&
                                studentStats.students.data &&
                                studentStats.students.data.length == 0 &&
                                <NotFound message={t("No student found")} />
                            }

                            {
                                !studentStatsLoading &&
                                !studentStatsError &&
                                studentStats.students &&
                                studentStats.students.data &&
                                studentStats.students.data.length > 0 &&

                                <StudentList
                                    isNew={false}
                                    dataList={studentStats.students.data}
                                    handleViewStudent={handleViewStudent}
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
        studentStats,
        studentStatsError,
        studentStatsLoading,

    } = state.Students

    return {
        studentStats,
        studentStatsError,
        studentStatsLoading,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getStudentsStats
    })(ActiveStudents)
)

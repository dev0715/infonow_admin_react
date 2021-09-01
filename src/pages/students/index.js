import React, { useEffect, useState } from 'react';
// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import {
    Card, CardBody, Row, Col, Button,
} from 'reactstrap'


import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

// ** Store & Actions
import { connect } from 'react-redux'

import { withRouter } from 'react-router';
import {
    getStudentsStats
} from './store/actions'

import { ChevronDown } from 'react-feather'


import { DateTime } from '../../components/date-time';
import UILoader from '../../@core/components/ui-loader';

import { StatsItemCard } from '../../views/stats-item-card'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './style.scss'

import NotFound from '../../components/not-found';
import NoNetwork from '../../components/no-network';

const Students = (props) => {

    const [currentPage, setCurrentPage] = useState(0)
    const { studentStats,
        studentStatsError,
        studentStatsLoading,} = props
    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }
    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
             pageCount={studentStats.students.data.length > 0 ? studentStats.students.data.length / 10 : 1}
            // pageCount={1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName='page-link'
            nextClassName='page-item next'
            previousClassName='page-item prev'
            previousLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        />
    )

    useEffect(() => {
        props.getStudentsStats()
    }, [])

    const handleViewStudent = (id) => {
        // props.history.push('/students/' + id)
        props.history.push(`/student-history/${id}`)
    }


    const columns = [
        {
            name: 'Name',
            sortable: true,
            minWidth: '250px',
            cell: s => {
                return (
                    <>
                        {
                            s.name
                        }
                    </>
                )
            }
        },
        {
            name: 'Email',
            sortable: true,
            minWidth: '250px',
            cell: s => {
                return (
                    <>
                        {
                            s.email
                        }
                    </>
                )
            }
        },
        {
            name: 'Date/Time',
            sortable: false,
            minWidth: '100px',
            cell: s => {
                return (
                    <>
                        <DateTime dateTime={s.createdAt} />
                    </>
                )
            }
        },
        {
            name: 'Action',
            minWidth: '250px',
            cell: s => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'
                            onClick={() => handleViewStudent(s.userId)}
                        >
                            View
                        </Button.Ripple>
                    </>
                )
            }
        },
    ]

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
                                    Students
                                </h4>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Students January"}
                                    value={studentStats.thisMonthCount}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Students 2021"}
                                    value={studentStats.thisYearCount}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Students All"}
                                    value={studentStats.allTimeCount}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Students Active"}
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
                                <NotFound message="No student found" />
                            }

                            {
                                !studentStatsLoading &&
                                !studentStatsError &&
                                studentStats.students &&
                                studentStats.students.data &&
                                studentStats.students.data.length > 0 &&
                                <DataTable
                                    noHeader
                                    pagination
                                    columns={columns}
                                    paginationPerPage={10}
                                    className='react-dataTable '
                                    sortIcon={<ChevronDown size={10} />}
                                    paginationDefaultPage={currentPage + 1}
                                    paginationComponent={CustomPagination}
                                    data={studentStats.students.data}
                                />}
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
    })(Students)
)

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
    getStudents
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
            // pageCount={props.newAssignments.length > 0 ? props.newAssignments.length / 10 : 1}
            pageCount={1}
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
        props.getStudents()
    }, [])

    const handleViewStudent = (id) => {
        props.history.push('/students/' + id)
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
                                    value={0}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Students 2021"}
                                    value={0}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Students All"}
                                    value={0}
                                />
                            </Col>
                            <Col sm='12' md='6' lg='3'>
                                <StatsItemCard
                                    label={"Students Active"}
                                    value={0}
                                />
                            </Col>
                        </Row>
                        <div className="shadow-stats-item mt-3">
                            {
                                !props.studentsLoading &&
                                props.studentsError &&
                                <NoNetwork message={props.studentsError} />
                            }
                            {
                                !props.studentsLoading &&
                                !props.studentsError &&
                                props.students.length == 0 &&
                                <NotFound message="No student found" />
                            }
                            {
                                !props.studentsLoading &&
                                !props.studentsError &&
                                props.students.length > 0 &&
                                <DataTable
                                    noHeader
                                    pagination
                                    columns={columns}
                                    paginationPerPage={10}
                                    className='react-dataTable '
                                    sortIcon={<ChevronDown size={10} />}
                                    paginationDefaultPage={currentPage + 1}
                                    paginationComponent={CustomPagination}
                                    data={props.students}
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
        students,
        studentsError,
        studentsLoading,
    } = state.Students

    return {
        students,
        studentsError,
        studentsLoading,
    }
}

export default withRouter(
    connect(mapStateToProps, {
        getStudents
    })(Students)
)

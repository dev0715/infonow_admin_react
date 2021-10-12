
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import React  from 'react'
import { useState } from 'react'
import { Button } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import { DateTime } from '../../components/date-time';
import { isNewExpression } from 'typescript'
import { useTranslation} from 'react-i18next'
const StudentList = (props) => {

    const { t } = useTranslation();
    const { dataList ,isNew} = props
    const [currentPage, setCurrentPage] = useState(0)

    const onSelect = (student) =>{
       props.onSelect(student)
    }

    const handleViewStudent = (id) => {
        props.handleViewStudent(id)
    }

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
            pageCount={dataList.length > 0 ? dataList.length / 10 : 1}
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


    const columns = [
        {
            name: `${t('Name')}`,
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
            name: `${t('Email')}`,
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
            name: `${t('DATE/TIME')}`,
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
            name: `${t('Action')}`,
            minWidth: '250px',
            omit:isNew,
            cell: s => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'
                            onClick={() => handleViewStudent(s.userId)}
                        >
                            {t('View')}
                        </Button.Ripple>
                    </>
                )
            }
        },
        {
            name: `${t('Assign')}`,
            minWidth: '250px',
            omit:!isNew,
            cell: s => {
                return (
                    <>
                        <Button.Ripple color='flat-primary'
                            onClick={() => onSelect(s)}
                        >
                            {t('Assign')} 
                        </Button.Ripple>
                    </>
                )
            }
        },
    ]

    return (
        <DataTable
        noHeader
        pagination
        columns={columns}
        paginationPerPage={10}
        className='react-dataTable '
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        paginationComponent={CustomPagination}
        data={dataList}
    />
    )

}

export default StudentList
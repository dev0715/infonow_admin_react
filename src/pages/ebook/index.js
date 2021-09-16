import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardImg, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import Cropper from 'cropperjs';
import UILoader from '../../@core/components/ui-loader';
import {
    postEbook,
    getEbooks
} from '@store/actions'
import { DOCUMENT_BASE_URL } from '../../helpers/url_helper';
const Ebook = (props) => {

    const { ebooks,
        ebooksError,
        ebooksLoading } = props
    const fetchEbooks = () => {
        props.getEbooks()
    }

    const addNewBook = () => {
        props.history.push('/new-ebook')
    }

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        fetchEbooks()
    }, [])

   
    return (
        <>
            <UILoader blocking={ebooksLoading}>
                <Row className="mb-2" >
                    <Col >
                        <Button.Ripple outline color="primary" onClick={() => addNewBook()}>
                            Add Ebook
                        </Button.Ripple>

                    </Col>
                </Row>

                <Row className='match-height'>

                    {
                        ebooks &&
                        ebooks.length > 0 &&
                        ebooks.map(
                            (book, index) => (
                                <Col lg='4' md='6' key = {`ebooksList-${index}`} >
                                    <Card>
                                        <CardImg top src={DOCUMENT_BASE_URL + book.coverImage} alt={book.title} />
                                        <CardBody>
                                            <CardTitle tag='h4'>{book.title}</CardTitle>
                                            <CardText>
                                                {book.description}
                                            </CardText>
                                            <Button.Ripple color='primary' outline>
                                                Download
                                            </Button.Ripple>
                                            <Button.Ripple className="ml-2" color='secondary' outline>
                                                Preview
                                            </Button.Ripple>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        )
                    }



                </Row>
            </UILoader>
        </>
    )
}



const mapStateToProps = (state) => {
    const {
        ebooks,
        ebooksError,
        ebooksLoading

    } = state.Ebook

    return {
        ebooks,
        ebooksError,
        ebooksLoading
    }

}

const mapDispatchToProps = {
    getEbooks,
    postEbook
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ebook))

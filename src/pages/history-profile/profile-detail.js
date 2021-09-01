import React from 'react';


import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import { PhoneCall, GitHub, Facebook, Linkedin, Twitter } from 'react-feather'
import { GET_IMAGE_URL } from '../../helpers/url_helper';
import { Card, Row, Col } from 'reactstrap'

const ProfileDetail = (props) => {

    const { user } = props;

    const profileLinks = (icon, link, type = "link") => {
        let links = link.split("/");
        return (

            <Col md="12" className="mb-1">
                <div className="d-flex align-items-center">
                    {icon}
                    <Link className="ml-2" color="primary" to={'#'} >
                        <small>
                            {type == "link" && "@"}
                            {links[links.length - 1]}
                        </small>
                    </Link>
                </div>
            </Col>
        )
    }

    return (
        <Card>

            {
                user &&
                //     <>  
                //         <Row>
                //         <Avatar
                //             img={GET_IMAGE_URL(user.profilePicture)}
                //             size={'xl'}
                //         />
                //         </Row>
                //         <Row> <h5 className="mt-2 mb-0">   {user.name}  </h5></Row>
                //         <Row><Link color="primary" to={'#'} >  <small>{user.email}</small> </Link></Row>
                //         <Row><Link color="primary" to={'#'} >  <small>{user.email}</small> </Link></Row>
                //         <Row><Link color="primary" to={'#'} >  <small>{user.email}</small> </Link></Row>
                //         <Row><Link color="primary" to={'#'} >  <small>{user.email}</small> </Link></Row>
                //   </>
                <>
                    <div className="shadow-stats-item p-2 d-flex flex-column align-items-center">
                        <div>
                            <Avatar
                                img={GET_IMAGE_URL(user.profilePicture)}
                                size={'xl'}
                            />
                        </div>
                        <h5 className="mt-2 mb-0">
                            {user.name}
                        </h5>
                        <Link color="primary" to={'#'} >
                            <small>{user.email}</small>
                        </Link>
                        <Row className="w-100 mt-2">
                            {
                                user.twitterLink &&
                                profileLinks(<Twitter />, user.twitterLink)
                            }

                            {
                                user.gitLink &&
                                profileLinks(<GitHub />, user.gitLink)

                            }

                            {
                                user.fbLink &&
                                profileLinks(<Facebook />, user.fbLink)

                            }

                            {
                                user.linkedInLink &&
                                profileLinks(<Linkedin />, user.linkedInLink)

                            }

                            {
                                user.contactNo &&
                                profileLinks(<PhoneCall />, user.contactNo, "phone")

                            }
                        </Row>
                    </div>

                </>

            }
        </Card>


    );
};




export default ProfileDetail;




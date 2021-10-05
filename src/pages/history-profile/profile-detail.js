import React, { useState , useEffect } from 'react';


import { Link } from 'react-router-dom'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

// ** Custom Components
import Avatar from '@components/avatar'
import { PhoneCall, GitHub, Facebook, Linkedin, Twitter } from 'react-feather'
import { GET_IMAGE_URL } from '../../helpers/url_helper';
import {
    Card, Row, Col, Button,
    Input, FormGroup, Label, ModalFooter, Modal, ModalBody, ModalHeader
} from 'reactstrap'

const ProfileDetail = (props) => {

    const { user , isTeacher ,paymentPlan , updateOrCreateSubscribtion} = props;
    const [isOpen, setIsOpen] = useState(false)
    const [planDurationInDays, setPlanDurationInDays] = useState(7)
    const [price, setPrice] = useState(10)
    const [currencyCode, setCurrencyCode] = useState("RON")
    const [planTerms, setPlanTerms] = useState("monthly")
    const [planDuration, setPlanDuration] = useState("1 Week")


    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    const SaveSubscribtion = () => { 
        let data = {
            "price":price,
            "planTerm":planTerms,
            "planDuration":planDuration,
            "currencyCode":currencyCode,
            "planDurationInDays":planDurationInDays
        }
        if(updateOrCreateSubscribtion)
            updateOrCreateSubscribtion(data)
        
        
    }

     useEffect(() => {
       if(paymentPlan){
           setPlanDurationInDays(paymentPlan.planDurationInDays)
           setPrice(paymentPlan.price)
           setPlanTerms(paymentPlan.planTerm)
           setPlanDuration(paymentPlan.planDuration)
           setCurrencyCode(paymentPlan.currencyCode)
           
       }
    }, [paymentPlan])

 
   

    const planDurationChange = (e) => {
        if(e.value == '1 Week') setPlanDurationInDays(7)
        else if(e.value == '1 Month') setPlanDurationInDays(30)
        else setPlanDurationInDays(90)

        setPlanDuration(e.value)
    }

    const planDurationOptions = [
        { value: '1 Week', label: '1 Week' },
        { value: '1 Month', label: '1 Month' },
        { value: '3 Month', label: '3 Month' }
    ]

    const planTermsOptions = [
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' }
    ]

    const currencyCodeOptions = [
        { value: 'RON', label: 'RON' },
        { value: 'USD', label: 'USD' }
    ]

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
                        {
                              isTeacher &&
                              <Button color="flat-primary" onClick={toggleModal}>Subscribtion</Button>
                        }
                       
                    </div>

                    <Modal className='modal-lg' isOpen={isOpen} toggle={toggleModal}>
                        <ModalHeader> Subscribtion </ModalHeader>
                        <ModalBody>

                            <FormGroup  >
                                <Label for='basicInput'>Price</Label>
                                <Input type='number' id='basicInput' placeholder='Enter price' value={price}  onChange={e => setPrice(e.target.value)}/>
                            </FormGroup>

                            <FormGroup >
                                <Label >Currency Code </Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={currencyCodeOptions.find(e => (e.value == currencyCode))}
                                    options={currencyCodeOptions}
                                    isClearable={false}
                                    onChange={e => setCurrencyCode(e.value)}
                                />
                            </FormGroup>

                            <FormGroup >
                                <Label >Plan Terms</Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={planTermsOptions.find(e => (e.value == planTerms))}
                                    options={planTermsOptions}
                                    isClearable={false}
                                    onChange={e => setPlanTerms(e.value)}
                                />
                            </FormGroup>

                            <FormGroup >
                                <Label >Plan Duration</Label>
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={planDurationOptions.find(e => (e.value == planDuration)) }
                                    options={planDurationOptions}
                                    isClearable={false}
                                    onChange={e => planDurationChange(e)}
                                />
                            </FormGroup>

                            <FormGroup  >
                                <Label for='basicInput'>Plan Duration in Days</Label>
                                <Input value={planDurationInDays} type='number' id='basicInput' placeholder='Enter price' disabled/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary' onClick={SaveSubscribtion}> {paymentPlan ? `Update` : `Create`}  </Button>
                        </ModalFooter>
                    </Modal>
                </>

            }
        </Card>


    );
};




export default ProfileDetail;




import React from "react";
import {useState} from "react";
import { useSkin } from "@hooks/useSkin";
import { Link, useHistory, withRouter } from "react-router-dom";
import { loginUser, loginError } from "@store/actions";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Alert,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation-safe";
import "@styles/base/pages/page-auth.scss";
import BrandLogo from "../../../components/brand-logo";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PasswordToggle from "../../../components/password-toggle";

const Login = (props) => {
  const [skin, setSkin] = useSkin();

  const { t } = useTranslation();
  const history = useHistory();

  const [userType, setUserType] = useState('admin')
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`);

  useEffect(() => {
    props.loginError(null);
  }, []);

  useEffect(() => {
    if (props.success) {
      window.location.reload();
    }
  }, [props.success]);

  const handleValidSubmit = (event, data) => {
      data.userType = userType
    props.loginUser(data, history);
  };

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/">
          <BrandLogo />
          <h2 className="brand-text text-primary ml-1">InfoNow</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Illustration" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              {t("LOGIN")}
            </CardTitle>
            <CardText className="mb-2">
              {t(`Welcome back! Please sign-in to your account`)}
            </CardText>

            <div className="demo-inline-spacing">
              <CustomInput
                name="loginRadio"
                type="radio"
                className="custom-control-Primary"
                id="admin"
                label="Admin"
                defaultChecked
                inline
                onClick={e => setUserType('admin')}
              />

              <CustomInput
                name="loginRadio"
                type="radio"
                className="custom-control-secondary"
                id="super"
                label="Super Admin"
                inline
                onClick={e => setUserType('super-admin')}
              />
            </div>
            <AvForm
              className="auth-login-form mt-2"
              onValidSubmit={(e, v) => handleValidSubmit(e, v)}
            >
              {props.error && typeof props.error === "string" ? (
                <Alert color="danger">
                  <div className="alert-body">
                    <span className="ml-1">{props.error}</span>
                  </div>
                </Alert>
              ) : null}

              <AvField
                name="email"
                label={t("Email")}
                className="form-control"
                placeholder="john@example.com"
                type="email"
                required
                autoFocus
              />

              <div className="d-flex justify-content-between">
                <Label className="form-label" for="password">
                  {t("Password")}
                </Label>
                <Link to="/forgot-password">
                  <small>{t("Forgot Password?")}</small>
                </Link>
              </div>
              <PasswordToggle name="password" label={t("Enter Password")} />
              <FormGroup>
                <CustomInput
                  type="checkbox"
                  className="custom-control-Primary"
                  id="remember-me"
                  label="Remember Me"
                />
              </FormGroup>

              <Button.Ripple
                type="submit"
                color="primary"
                block
                disabled={props.loading}
              >
                {props.loading && (
                  <>
                    <i className="las la-spinner la-spin"></i>&nbsp;&nbsp;
                  </>
                )}
                {t("Sign in")}
              </Button.Ripple>
            </AvForm>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { error, success, user } = state.Login;
  return {
    error,
    success,
    user,
  };
};

export default withRouter(
  connect(mapStateToProps, { loginUser, loginError })(Login)
);

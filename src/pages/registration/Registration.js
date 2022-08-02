import { Button, Grid, Typography } from "@mui/material";
import { callApi } from "../../hooks/useApi";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";

export default function Registration() {

    const navigate = useNavigate();

    return(
    <FormContainer formTitle={"Registration"}>
        <Formik initialValues={{name: '', password: '', password2: ''}}
         validate={(values)=>{
            const errors = {};

            if (!values.name) {
                errors.name = "Required";
            }

            if (!values.password) {
                errors.password = "Required";
            }

            if (!values.password2) {

                errors.password2 = "Required";
            }
            else {
                if (values.password!==values.password2) {
                    errors.password = "Passwords don't match";
                    errors.password2 = "Passwords don't match";
                }
            } 

            return errors;
         }}
         onSubmit={(values, {setSubmitting, setFieldError}) => {
            callApi('post', '/reg', values).then(_unUsedResponse => {
                setSubmitting(false);
                navigate("/login");
            }).catch(error => {
                if (error.response.data.error.toLowerCase().includes("name")) {
                    setFieldError("name", error.response.data.error);
                }
                if (error.response.data.error.toLowerCase().includes("password")) {
                    setFieldError("password", error.response.data.error);
                }
                setSubmitting(false);
            });
         }}>
            {({isSubmitting}) => (
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="name" label="Username" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="password" label="Password" type="password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="password2" label="Confirm Password" type="password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth>Register</Button>
                    </Grid>
                </Grid>
            </Form>
            )}
        </Formik>
        <Grid container spacing={2} marginTop={5}>
            <Grid item xs={6}>
                <Typography variant="overline">Already registered?</Typography>
            </Grid>
            <Grid item xs={6}>
                <Button size="small" fullWidth onClick={()=>navigate("/login")}>Login Here</Button>
            </Grid>
        </Grid>
    </FormContainer>
    );
}
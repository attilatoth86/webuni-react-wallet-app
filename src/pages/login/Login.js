import { Button, Grid, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { callApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {

    const navigate = useNavigate();
    const { handleLoginResult } = useAuth();

    return(
    <FormContainer formTitle={"Login"}>
        <Formik initialValues={{name: '', password: ''}} 
         onSubmit={(values, {setSubmitting, setFieldError}) => {
            callApi('post', '/login', values).then(response => {
                handleLoginResult(response.data);
                setSubmitting(false);
                navigate("/");
            }).catch(error => {
                if (error.response.data.error.includes("user")) {
                    setFieldError("name", error.response.data.error);
                } else if (error.response.data.error.includes("password")) {
                    setFieldError("password", error.response.data.error);
                }
                else {
                    console.error(error.response.data.error);
                }
                setSubmitting(false);
            });
         }}>
            {({isSubmitting}) => (
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="name" 
                         label="Username" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="password" 
                         label="Password" type="password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" disabled={isSubmitting} 
                         variant="contained" fullWidth>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Form>
            )
            }
        </Formik>
        <Grid container spacing={2} marginTop={5}>
            <Grid item xs={6}>
                <Typography variant="overline">
                    New to the Wallet App?
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button size="small" fullWidth 
                 onClick={() => navigate("/register")}>
                    Create new account
                </Button>
            </Grid>
        </Grid>
    </FormContainer>
    );
}
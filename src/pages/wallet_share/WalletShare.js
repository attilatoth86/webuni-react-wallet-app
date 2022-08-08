import { Button, Grid } from "@mui/material";
import { callApi } from "../../hooks/useApi";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FormContainer from "../../components/FormContainer";

export default function WalletShare() {

    const { id } = useParams();
    const { authToken } = useAuth();
    const navigate = useNavigate();

    return (
    <FormContainer formTitle={"Share Wallet"}>
        <Formik initialValues={{name: ''}} 
         validate={(values)=>{
            const errors = {};

            if (!values.name) {
                errors.name = "Required";
            }

            return errors;
         }}
        onSubmit={
            (values, {setSubmitting, setFieldError}) => {

                callApi('post', '/user/search', values, authToken
                ).then(
                    response => {
                        const user_id = response.data;
                        callApi('post',
                                `/wallet/${id}/grant_access`,
                                {user_id: user_id},
                                authToken
                                ).then(response => {
                                    setSubmitting(false);
                                    navigate(`/wallet/${id}`);
                                }).catch(error => {
                                    setSubmitting(false);
                                    setFieldError("name", 
                                        error.response.data.error);
                                });
                }).catch(error => {
                    setSubmitting(false);
                    setFieldError("name", error.response.data.error);
            });
        }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="name" 
                         label="Username" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Share Wallet
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" fullWidth 
                         onClick={()=>navigate(`/wallet/${id}`)}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    </FormContainer>
    );
}
import { Alert, Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { callApi } from "../../hooks/useApi";
import FormContainer from "../../components/FormContainer";

export default function NewWallet() {

    const navigate = useNavigate();
    const { authToken } = useAuth();

    return(
    <FormContainer formTitle={"New Wallet"}>
        <Formik initialValues={{name: '', description: '', extra: {}}}
         validate={(values)=>{
            const errors = {};

            if (!values.name) {
                errors.name = "Required";
            }

            if (!values.description) {
                errors.description = "Required";
            }

            return errors;
         }}
         onSubmit={(values, {setSubmitting, setStatus}) => {

            callApi('put', '/wallet', values, authToken).then(
                _unusedResponseData => {
                    setSubmitting(false);
                    navigate("/mywallets");
            }).catch(error => {
                setStatus(error.response.data.error);
                setSubmitting(false);
            });

         }}>
            {({ isSubmitting, status }) => (
            <Form>
                <Grid container spacing={2}>
                    { status && 
                    <Grid item xs={12}>
                        <Alert severity="error">{status}</Alert>
                    </Grid>
                    }
                    <Grid item xs={12}>
                        <Field component={TextField} name="name" 
                         label="Wallet Name" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="description" 
                         label="Wallet Description" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth 
                         disabled={isSubmitting}>
                            Create Wallet
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button  variant="outlined" fullWidth
                         onClick={() => navigate('/mywallets')}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Form>
            )}
        </Formik>
    </FormContainer>
    );
}
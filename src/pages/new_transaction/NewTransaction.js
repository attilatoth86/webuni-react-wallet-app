import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { callApi } from "../../hooks/useApi";
import FormContainer from "../../components/FormContainer";


export default function NewTransaction() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { authToken } = useAuth();

    return (<>
    <FormContainer formTitle={"New Transaction"} >
        <Formik initialValues={{wallet_id: id, title: '', amount: '', extra: {}}} 
         validate={(values)=>{
            const errors = {};

            if (!values.title) {
                errors.title = "Required";
            }

            if (!values.amount) {
                errors.amount = "Required";
            }

            return errors;
         }}
         onSubmit={(values, {setSubmitting})=>{
            
            callApi('put', '/transactions', values, authToken).then(
                _unUsedResponseData => {
                    setSubmitting(false);
                    navigate(`/wallet/${id}`);
            }).catch(error => {
                console.error(error.response.data.error);
                setSubmitting(false);
            });

         }}>
            {({setFieldValue}) => (
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="title" 
                         label="Transaction Title" type="text" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="amount" 
                         label="Transaction Amount" type="text" fullWidth 
                         onChange={e => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                            if (!value | regex.test(value.toString())) {
                              setFieldValue("amount", value);
                            }
                          }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Create Transaction
                        </Button>
                    </Grid>
                </Grid>
            </Form>
            )}
        </Formik>
        <br/>
        <Button variant="outlined" fullWidth 
         onClick={()=>navigate(`/wallet/${id}`)}>
            Cancel
        </Button>
    </FormContainer>
    </>);
}
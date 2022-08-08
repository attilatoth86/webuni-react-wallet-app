import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
import FormContainer from "../../components/FormContainer";

export default function TransactionDeleteConfirm() {

    const navigate = useNavigate();
    const { transaction_id } = useParams();
    const {authToken} = useAuth()
    const [transaction, setTransaction] = useState({title: '', amount: ''});

    useEffect(()=>{
        callApi('get', `/transaction/${transaction_id}`, undefined, authToken
        ).then((response)=>{
            setTransaction(response.data);
        }).catch((error)=>{
            console.error(error);
        });
    }, [transaction_id, authToken]);

    return (
        <FormContainer formTitle={"Confirm Transaction Delete"} 
         formSubTitle={
         <>You are about to <b>delete</b> the following transaction.</>
         }>
            <Formik enableReinitialize={true} initialValues={transaction}>
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field component={TextField} name="title" disabled
                            label="Transaction Title" type="text" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField} name="amount" disabled
                            label="Transaction Amount" type="text" fullWidth/>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <br/>
            <Button variant="outlined" color="error" fullWidth onClick={() => {
                callApi('delete', 
                        `/transaction/${transaction_id}`, 
                        undefined, 
                        authToken).then(
                    _unusedResponseData => {
                    navigate(`/wallet/${transaction.wallet_id}`);
                }).catch(error => {
                    console.error(error.response.data.error);
                });
            }}>
                Confirm Delete
            </Button>
            <br/><br/>
            <Button variant="contained" fullWidth 
             onClick={() => navigate(`/wallet/${transaction.wallet_id}`)}>
                Cancel
            </Button>
        </FormContainer>
    );
}
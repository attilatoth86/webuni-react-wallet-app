import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
import FormContainer from "../../components/FormContainer";

export default function TransactionEdit() {

    const { transaction_id } = useParams();
    const navigate = useNavigate();
    const {authToken} = useAuth()
    const [transaction, setTransaction] = useState(false);

    useEffect(()=>{
        callApi('get', `/transaction/${transaction_id}`, undefined, authToken
        ).then((response)=>{
            setTransaction(response.data);
        }).catch((error)=>{
            console.error(error);
        });
    }, [transaction_id, authToken]);
    
    return(
    <FormContainer formTitle={"Edit Transaction"}>
        <Formik enableReinitialize={true} initialValues={transaction}
         onSubmit={(values, {setSubmitting}) => {

            callApi('patch', 
                    `/transaction/${transaction_id}`, 
                    values, 
                    authToken
            ).then(
                _unusedResponseData => {
                    setSubmitting(false);
                    navigate(`/wallet/${transaction.wallet_id}`);
            }).catch((error)=>{
                setSubmitting(false);
                console.error(error);
            });

         }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="title" 
                         label="Transaction Title" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="amount" 
                         label="Transaction Amount" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Edit Transaction
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
        <br/>
        <Button variant="outlined" fullWidth 
         onClick={() => navigate(`/wallet/${transaction.wallet_id}`)}>
            Cancel
        </Button>
    </FormContainer>
    );
}
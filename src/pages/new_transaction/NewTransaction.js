import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function NewTransaction() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { authToken } = useAuth();

    return (<>
    <Container maxWidth="sm">
        <Typography variant="h4" marginTop={3} marginBottom={3}>New Transaction</Typography>
        <Formik initialValues={{wallet_id: id, title: '', amount: 0, extra: {}}} 
         onSubmit={(values, {setSubmitting})=>{

            console.log(values);

            axios({
                method: 'put',
                url: 'https://wallet.atoth.workers.dev/transactions',
                data: values,
                headers: {'Authorization': 'Bearer ' + authToken}
            }).then(response => {

                console.log(response);

                setSubmitting(false);
                navigate(`/wallet/${id}`);

            }).catch(error => {

                console.error(error.response.data.error);

                setSubmitting(false);
            });

         }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="title" label="Transaction Title" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="amount" label="Transaction Amount" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>Create Transaction</Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
        <br/>
        <Button variant="outlined" fullWidth onClick={()=>navigate(`/wallet/${id}`)}>Cancel</Button>
    </Container>
    </>);
}
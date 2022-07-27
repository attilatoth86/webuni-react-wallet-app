import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function NewWallet() {

    const navigate = useNavigate();
    const { authToken } = useAuth();

    return(
    <Container maxWidth="sm">
        <Typography variant="h3" marginTop={3} marginBottom={3}>New Wallet</Typography>
        <Formik initialValues={{name: '', description: '', extra: {}}} 
         onSubmit={(values, {setSubmitting}) => {

            console.log(values);

            axios({
                method: 'put',
                url: 'https://wallet.atoth.workers.dev/wallet',
                data: values,
                headers: {'Authorization': 'Bearer ' + authToken}
            }).then(response => {

                console.log(response);

                setSubmitting(false);
                navigate("/mywallets");

            }).catch(error => {

                console.error(error.response.data.error);

                setSubmitting(false);
            });

         }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="name" label="Wallet Name" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="description" label="Wallet Description" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>Create Wallet</Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    </Container>
    );
}
import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ShareWallet() {

    const { id } = useParams();
    const { authToken } = useAuth();

    return (<Container maxWidth="sm">
        <Typography variant="h3" marginTop={3} marginBottom={3}>Share Wallet</Typography>
        <Formik initialValues={{name: ''}} onSubmit={(values, {setSubmitting})=>{

            console.log(values);

            axios({
                method: 'post',
                url: 'https://wallet.atoth.workers.dev/user/search',
                data: values,
                headers: {'Authorization': 'Bearer ' + authToken}
            }).then(response => {

                console.log(response);

                const user_id = response.data;
                axios({
                    method: 'post',
                    url: `https://wallet.atoth.workers.dev/wallet/${id}/grant_access`,
                    data: {user_id: user_id},
                    headers: {'Authorization': 'Bearer ' + authToken}
                }).then(response => {

                    console.log(response);
                    
                }).catch(error => {

                    console.error(error.response.data.error);

                });
            }).catch(error => {

                console.error(error.response.data.error);

                setSubmitting(false);
            });
        }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="name" label="Username" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>Share Wallet</Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    </Container>);
}
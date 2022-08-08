import { Button, Grid} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { callApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

export default function WalletEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const {authToken} = useAuth()
    const [wallet, setWallet] = useState(false);

    useEffect(()=>{
        callApi('get', `/wallet/${id}`, undefined, authToken).then((response)=>{
            setWallet(response.data);
        }).catch((error)=>{
            console.error(error);
        });
    }, [id, authToken]);

    return (
    <FormContainer formTitle={`Edit ${wallet.name}`}>
        <Formik enableReinitialize={true} initialValues={wallet}
         onSubmit={(values, {setSubmitting}) => {

            callApi('patch', `/wallet/${id}`, values, authToken).then(
                _unusedResponseData => {
                    setSubmitting(false);
                    navigate(`/wallet/${wallet.id}`);
            }).catch((error)=>{
                setSubmitting(false);
                console.error(error);
            });

         }}>
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field component={TextField} name="name" 
                         label="Wallet Name" type="text" fullWidth disabled />
                    </Grid>
                    <Grid item xs={12}>
                        <Field component={TextField} name="description" 
                         label="Wallet Description" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Edit Wallet
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" fullWidth 
                         onClick={()=>navigate(`/wallet/${wallet.id}`)}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    </FormContainer>
    );
}
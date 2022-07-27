import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

export default function DeleteWalletConfirm() {

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
        <Container maxWidth="sm">
            <Typography variant="h4" marginTop={3} marginBottom={3}>Confirm Wallet Delete</Typography>
            <Typography variant="body2">
                You are about to delete the '<b>{wallet.name}</b>' wallet.
            </Typography>
            <br/>
            <Button variant="outlined" color="error" fullWidth onClick={()=>{
                callApi('delete', `/wallet/${id}`, undefined, authToken).then(
                    _unusedResponseData => {
                    navigate("/mywallets");
                }).catch(error => {
                    console.error(error.response.data.error);
                });
            }}>Confirm Delete</Button>
            <br/><br/>
            <Button variant="contained" fullWidth onClick={()=>navigate("/mywallets")}>Cancel</Button>
        </Container>
    );
}
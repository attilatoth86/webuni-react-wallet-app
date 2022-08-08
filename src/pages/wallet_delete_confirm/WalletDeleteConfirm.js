import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { callApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

export default function WalletDeleteConfirm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const {authToken} = useAuth()
    const [wallet, setWallet] = useState(false);

    useEffect(()=>{
        callApi('get', `/wallet/${id}`, undefined, authToken).then(response => {
            setWallet(response.data);
        }).catch((error)=>{
            console.error(error);
        });
    }, [id, authToken]);

    return (
        <FormContainer formTitle={"Confirm Wallet Delete"} 
         formSubTitle={
         <>You are about to <b>delete</b> the '<b>{wallet.name}</b>' wallet.</>
         }>
            <Button variant="outlined" color="error" fullWidth onClick={()=>{
                callApi('delete', `/wallet/${id}`, undefined, authToken).then(
                    _unusedResponseData => {
                    navigate("/mywallets");
                }).catch(error => {
                    console.error(error.response.data.error);
                });
            }}>Confirm Delete</Button>
            <br/><br/>
            <Button variant="contained" fullWidth 
             onClick={()=>navigate("/mywallets")}>
                Cancel
            </Button>
        </FormContainer>
    );
}
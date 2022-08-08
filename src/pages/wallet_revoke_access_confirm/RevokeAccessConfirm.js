import { Button } from "@mui/material";
import FormContainer from "../../components/FormContainer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

export default function RevokeAccessConfirm() {

    const { wallet_id, user_id } = useParams();
    const navigate = useNavigate();
    const { authToken } = useAuth();
    const [revokableUser, setRevokeableUser] = useState(false);
    const [impactedWallet, setImpactedWallet] = useState(false);

    useEffect(()=>{

        callApi('get', `/user/${user_id}`).then(
            responseData => {
                setRevokeableUser(responseData.data);
            }).catch(error => {
                console.error(error.response.data.error);
            });

        callApi('get', `/wallet/${wallet_id}`, undefined, authToken).then(
            response => {
            setImpactedWallet(response.data);
        }).catch((error)=>{
            console.error(error);
        });

    }, [user_id, wallet_id, authToken]);

    return (
        <FormContainer formTitle={"Confirm Access Revoke"} 
         formSubTitle={<>You are about to revoke access of '<b>{revokableUser.name}</b>' from '<b>{impactedWallet.name}</b>' wallet.</>}>
            <Button variant="outlined" color="error" fullWidth onClick={()=>{
                callApi('post', `/wallet/${wallet_id}/remove_access`, 
                        {user_id: user_id}, authToken
                ).then(
                    _unusedResponseData => {
                    navigate(`/wallet/${wallet_id}`);
                }).catch(error => {
                    console.error(error.response.data.error);
                });
            }}>
                Confirm Revoke
            </Button>
            <br/><br/>
            <Button variant="contained" fullWidth 
             onClick={()=>navigate(`/wallet/${wallet_id}`)}>
                Cancel
            </Button>
        </FormContainer>
    );
}
import { Container } from "@mui/system";
import { Navigate, Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { useAuth } from "./hooks/useAuth";
import DeleteTransactionConfirm from "./pages/delete_transaction_confirm/DeleteTransactionConfirm";
import DeleteWalletConfirm from "./pages/delete_wallet_confirm/DeleteWalletConfirm";
import EditTransaction from "./pages/edit_transaction/EditTransaction";
import EditWallet from "./pages/edit_wallet/EditWallet";
import Login from "./pages/login/Login";
import MyWallets from "./pages/my_wallets/MyWallets";
import NewTransaction from "./pages/new_transaction/NewTransaction";
import NewWallet from "./pages/new_wallet/NewWallet";
import Registration from "./pages/registration/Registration";
import RevokeAccessConfirm from "./pages/revoke_access_confirm/RevokeAccessConfirm";
import ShareWallet from "./pages/share_wallet/ShareWallet";
import WalletDetail from "./pages/wallet_detail/WalletDetail";
import Providers from "./Providers";


function ProtectedPage({children}) {

  const {authToken} = useAuth();

  if (authToken === false) {
    return(<Navigate to="/login"></Navigate>);
  }

  return children;

}


function App() {
  return (
    <div className="App">
      <Providers>
        <MenuBar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" exact element={
              <div>
                <h1>Welcome to the Wallet App!</h1>
                <p>An online system to store financial transactions in shareable wallets.</p>
              </div>
            } />
            <Route path="/login" exact element={<Login />}/>
            <Route path="/register" exact element={<Registration />}/>
            <Route path="/mywallets" exact element={
              <ProtectedPage>
                <MyWallets/>
              </ProtectedPage>}/>
            <Route path="/wallet/new" exact element={
              <ProtectedPage>
                <NewWallet/>
              </ProtectedPage>}/>
            <Route path="/wallet/delete/:id/confirm" exact element={
             <ProtectedPage>
              <DeleteWalletConfirm />
             </ProtectedPage>}/>
            <Route path="/wallet/:id" exact element={
              <ProtectedPage>
                <WalletDetail/>
              </ProtectedPage>}/>
            <Route path="/wallet/:id/transaction/new" exact element={
              <ProtectedPage>
                <NewTransaction/>
              </ProtectedPage>}/>
            <Route path="/wallet/:id/share" exact element={
              <ProtectedPage>
                <ShareWallet/>
              </ProtectedPage>}/>
            <Route path="/wallet/:wallet_id/remove_access/:user_id" exact 
             element={<ProtectedPage><RevokeAccessConfirm/></ProtectedPage>}/>
            <Route path="/wallet/:id/edit" exact element={
              <ProtectedPage>
                <EditWallet/>
              </ProtectedPage>}/>
            <Route path="transaction/:transaction_id/edit" exact element={
              <ProtectedPage>
                <EditTransaction/>
              </ProtectedPage>}/>
            <Route path="transaction/:transaction_id/delete" exact element={
              <ProtectedPage>
                <DeleteTransactionConfirm/>
              </ProtectedPage>}/>
          </Routes>
        </Container>
      </Providers>
    </div>
  );
}

export default App;

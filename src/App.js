import { Container } from "@mui/system";
import { Navigate, Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { useAuth } from "./hooks/useAuth";
import TransactionDeleteConfirm from "./pages/transaction_delete_confirm/TransactionDeleteConfirm";
import DeleteWalletConfirm from "./pages/wallet_delete_confirm/WalletDeleteConfirm";
import TransactionEdit from "./pages/transaction_edit/TransactionEdit";
import WalletEdit from "./pages/wallet_edit/WalletEdit";
import Login from "./pages/login/Login";
import MyWallets from "./pages/my_wallets/MyWallets";
import TransactionNew from "./pages/transaction_new/TransactionNew";
import WalletNew from "./pages/wallet_new/WalletNew";
import Registration from "./pages/registration/Registration";
import RevokeAccessConfirm from "./pages/wallet_revoke_access_confirm/RevokeAccessConfirm";
import WalletShare from "./pages/wallet_share/WalletShare";
import WalletDetail from "./pages/wallet_detail/WalletDetail";
import Providers from "./Providers";
import Page404 from "./pages/page404/Page404";


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
                <WalletNew/>
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
                <TransactionNew/>
              </ProtectedPage>}/>
            <Route path="/wallet/:id/share" exact element={
              <ProtectedPage>
                <WalletShare/>
              </ProtectedPage>}/>
            <Route path="/wallet/:wallet_id/remove_access/:user_id" exact 
             element={<ProtectedPage><RevokeAccessConfirm/></ProtectedPage>}/>
            <Route path="/wallet/:id/edit" exact element={
              <ProtectedPage>
                <WalletEdit/>
              </ProtectedPage>}/>
            <Route path="transaction/:transaction_id/edit" exact element={
              <ProtectedPage>
                <TransactionEdit/>
              </ProtectedPage>}/>
            <Route path="transaction/:transaction_id/delete" exact element={
              <ProtectedPage>
                <TransactionDeleteConfirm/>
              </ProtectedPage>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </Container>
      </Providers>
    </div>
  );
}

export default App;

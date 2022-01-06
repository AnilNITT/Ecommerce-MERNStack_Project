import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Header from "./component/layout/Header/Header";
import HeaderOne from "./component/layout/Header/HeaderOne";
import WebFont from "webfontloader";
import { useEffect} from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Updateprofile from "./component/User/Updateprofile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
//import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import DashBoard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
//import {useDispatch} from "react-redux";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {


  
  // const dispatch=useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);

   //const [stripeApiKey, setStripeApiKey] = useState("");

  //  async function getStripeApiKey() {
  //    const { data } = await axios.get("/api/v1/stripeapikey");

  //    setStripeApiKey(data.stripeApiKey);
  //  }

    // const {pathname}=window.location;
    // let HideHeader=(pathname==='/payment/process' ? null : <NotFound />)
    // console.log(HideHeader);

    const stripeApiKey="pk_test_51K6CEsSCqGKG0ElciVBVUmdZmkmrUD8InXevKHOs0583Wwuoa4EeMxu6zKrfIUMWJPIfAJLwWyiooTqRSP1Av3Xa00zELhVg4Y";

    const stripePromise=loadStripe(stripeApiKey)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    // other way of dispatch
    // store.dispatch(loadUSer());
    store.dispatch(loadUser());
    
    //getStripeApiKey();

  }, []);

  window.addEventListener("contextmenu",(e)=>e.preventDefault());

  return (
    <Router>
      <HeaderOne />

       {isAuthenticated && <UserOptions user={user} />}


      {stripeApiKey && (
        <Elements stripe={stripePromise}>
           <Routes>
              <Route exact path="/payment/process" element={<ProtectedRoute><Payment/></ProtectedRoute>}/>
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/about" element={<About />} />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* <Route path="/account" element={isAuthenticated ? <Profile /> : <LoginSignUp />}/> */}
        {/* <Route><>
        {isAuthenticated && <> <Route exact path="/account" element={<Profile />}/> </>}
        </></Route> */}


        <Route exact path="/me/update" element={<ProtectedRoute><Updateprofile/></ProtectedRoute>} />

        <Route exact path="/password/update" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />

        <Route exact path="/password/forgot" element={<ForgotPassword/>} />

        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />

        <Route exact path="/cart" element={<Cart/>} />

        <Route exact path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>} />

        <Route exact path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />

        {/* <Route exact path="/process/payment" element={<ProtectedRoute stripe={loadStripe(stripeApiKey)}><Payment/></ProtectedRoute>} /> */}
        {/* <Route exact path="/process/payment" element={<Elements ><Payment stripe={loadStripe(stripeApiKey)}/></Elements>} /> */}

        {/* <Route exact path="/process/payment" element={<Elements><ProtectedRoute stripe={loadStripe(stripeApiKey)}> <Payment/></ProtectedRoute></Elements>} /> */}

        <Route exact path="/success" element={<OrderSuccess/>} />

        <Route exact path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />
        {/* <Route exact path="/orders" element={<MyOrders/>} /> */}

        <Route exact path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />

        <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><DashBoard/></ProtectedRoute>} />

        <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>} />

        <Route exact path="/admin/product" element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>} />

        <Route exact path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>} />

        <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>} />

        <Route exact path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder/></ProtectedRoute>} />

        <Route exact path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList/></ProtectedRoute>} />

        <Route exact path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>} />

        <Route exact path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReviews/></ProtectedRoute>} />

        <Route path="*" element={window.location.pathname==="/payment/processs" ? null :<NotFound />} />
        
      </Routes>

      <Footer />
    </Router>
  );
}
export default App;

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import Home from "../../Pages/Home/Home";
import CreateUser from "../../Pages/CreateUser/CreateUser";
import Branches from "../../Pages/Branches/Branches";
import UserDashLayout from "../../Layouts/UserDashLayout/UserDashLayout";
import UserProfile from "../../Pages/userProfile/UserProfile";
import UserOrders from "../../Pages/UserOrders/UserOrders";
import UserWishList from "../../Pages/UserWishList/UserWishList";
import UserRefunds from "../../Pages/UserRefunds/UserRefunds";
import LoginUser from "../../Pages/LoginUser/LoginUser";
import UserCart from "../../Pages/UserCart/UserCart";
import CheckoutPage from "../../Pages/CheckoutPage/CheckoutPage";
import AdminDashLayout from "../../Layouts/AdminDashLayout/AdminDashLayout";
import AdminProfile from "../../Pages/AdminProfile/AdminProfile";
import AdminAllProducts from "../../Pages/AdminAllProducts/AdminAllProducts";
import AdminStockOutProducts from "../../Pages/AdminStockOutProducts/AdminStockOutProducts";
import AdminDeletedProducts from "../../Pages/AdminDeletedProducts/AdminDeletedProducts";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Offers from "../../Pages/Offers/Offers";
import ContactPage from "../../Pages/ContactPage/ContactPage";
import FAQ from "../../Pages/FAQ/FAQ";
import FlashSales from "../../Pages/FlashSales/FlashSales";
import UserPrivateRoute from "../UserPrivateRoute/UserPrivateRoute";
import AdminPrivateRoute from "../AdminPrivateRoute/AdminPrivateRoute";
import AdminAllCategories from "../../Pages/AdminAllCategories/AdminAllCategories";
import AdminPendingOrders from "../../Pages/AdminPendingOrders/AdminPendingOrders";
import AdminConfirmedOrders from "../../Pages/AdminConfirmedOrders/AdminConfirmedOrders";
import AdminDeletedOrders from "../../Pages/AdminDeletedOrders/AdminDeletedOrders";
import AllAdmins from "../../Pages/AllAdmins/AllAdmins";
import AdminFlashSales from "../../Pages/AdminFlashSales/AdminFlashSales";
import AdminAllCustomers from "../../Pages/AdminAllCustomers/AdminAllCustomers";
import AdminOffers from "../../Pages/AdminOffers/AdminOffers";
import AdminReviews from "../../Pages/AdminReviews/AdminReviews";
import AdminCreateProduct from "../../Pages/AdminCreateProduct/AdminCreateProduct";
import BkashPaymentPage from "../../Pages/BkashPaymentPage/BkashPaymentPage";
import BkashPaymentPageTwo from "../../Pages/BkashPaymentPageTwo/BkashPaymentPageTwo";
import BkashPaymentPageThree from "../../Pages/BkashPaymentPageThree/BkashPaymentPageThree";
// import BkashPaymentPageFour from "../../Pages/BkashPaymentPageFour/BaskPaymentPageFour";
import AdminAllDiscounts from "../../Pages/AdminAllDiscounts.jsx/AdminAllDiscounts";
import BkashPaymentPageFour from "../../Pages/BkashPaymentPageFour/BkashPaymentPageFour";
import UserReviews from "../../Pages/UserReviews/UserReviews";
import AdminAllReviews from "../../Pages/AdminAllReviews/AdminAllReviews";
import AdminDeliveryCharge from "../../Pages/AdminDeliveryCharge/AdminDeliveryCharge";
import AdminTaxHandle from "../../Pages/AdminTaxHandle/AdminTaxHandle";
import AdminAllDeliveredOrders from "../../Pages/AdminAllDeliveredOrders/AdminAllDeliveredOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/branches",
        element: <Branches></Branches>,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage></CheckoutPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/offers",
        element: <Offers></Offers>,
      },
      {
        path: "/contact",
        element: <ContactPage></ContactPage>,
      },
      {
        path: "/faq",
        element: <FAQ></FAQ>,
      },
      {
        path: "/flashsales",
        element: <FlashSales></FlashSales>,
      },
    ],
  },
  {
    path: "/user/dash",
    element: (
      <PrivateRoute>
        <UserPrivateRoute>
          <UserDashLayout></UserDashLayout>
        </UserPrivateRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/user/dash",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <UserProfile />
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/dash/orders",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <UserOrders />
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/dash/wishlist",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <UserWishList></UserWishList>
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/dash/reviews",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <UserReviews />
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/dash/refunds",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <UserRefunds></UserRefunds>
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/dash/cart",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <UserCart></UserCart>
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/dash/payment",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <BkashPaymentPage />
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/dash/paymenttwo",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <BkashPaymentPageTwo />
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/dash/paymentthree",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <BkashPaymentPageThree />
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user/dash/paymentfour",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <BkashPaymentPageFour />
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin/panel",
    element: (
      <PrivateRoute>
        <AdminPrivateRoute>
          <AdminDashLayout />
        </AdminPrivateRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin/panel",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminProfile />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/allproducts",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminAllProducts />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/allReviews",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminAllReviews />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/deliverycharge",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminDeliveryCharge />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/alldiscounts",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminAllDiscounts />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/tax",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminTaxHandle />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/stockout/products",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminStockOutProducts />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/deleted/products",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminDeletedProducts />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/createproducts",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminCreateProduct />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/allcategories",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminAllCategories />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/pending/orders",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminPendingOrders />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/confirmed/orders",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminConfirmedOrders />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/delivered/orders",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminAllDeliveredOrders />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/deleted/orders",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminDeletedOrders />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/allcustomers",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminAllCustomers />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/alladmins",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AllAdmins />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/flashsales",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminFlashSales />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/offers",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminOffers />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/panel/reviews",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AdminReviews />
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <CreateUser></CreateUser>,
  },
  {
    path: "/login",
    element: <LoginUser></LoginUser>,
  },
]);

export default router;

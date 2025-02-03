import { createBrowserRouter } from 'react-router-dom'
import { PATH, Role } from '@/utils'
import { DefaultLayout, ProfileLayout } from '@/layouts'
import {
  Home,
  Cart,
  AllProducts,
  Blog,
  BlogDetail,
  Contact,
  Register,
  Login,
  VerifyEmail,
  ForgotPassword,
  ProductDetail,
  Profile,
  ChangePassword,
  Address,
  Checkout,
  Orders,
  VerifyPayment,
  ProductSearch
} from '@/pages'
import {
  CollabPolicies,
  ExchangePolicies,
  MembershipPolicies,
  PaymentPolicies,
  PurchasePolicies,
  SecurityPolicies,
  StockPolicies,
  Collaborator,
  ExchangeReturn,
  Gift,
  Inquiries,
  Payment,
  RetailAdvice,
  Size
} from '@/components'

import { ProtectedRoute } from './ProtectedRoute'
import { StoreSystem } from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: PATH.register,
        element: <Register />
      },
      {
        path: PATH.verifyEmail,
        element: <VerifyEmail />
      },
      {
        path: PATH.login,
        element: <Login />
      },
      {
        path: PATH.forgotPassword,
        element: <ForgotPassword />
      },
      {
        path: PATH.products,
        element: <AllProducts />
      },
      {
        path: PATH.home,
        element: <Home />
      },
      {
        path: '/',
        element: (
          <ProtectedRoute role={Role.User}>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: PATH.profile,
            element: <Profile />
          },
          {
            path: PATH.changePassword,
            element: <ChangePassword />
          },
          {
            path: PATH.address,
            element: <Address />
          },
          {
            path: PATH.orders,
            element: <Orders />
          }
        ]
      },
      {
        path: PATH.checkout,
        element: (
          <ProtectedRoute role={Role.User}>
            <Checkout />
          </ProtectedRoute>
        )
      },
      {
        path: PATH.verify_payment,
        element: <VerifyPayment />
      },
      {
        path: PATH.collab_pol,
        element: <CollabPolicies />
      },
      {
        path: PATH.exchange_pol,
        element: <ExchangePolicies />
      },
      {
        path: PATH.membership_pol,
        element: <MembershipPolicies />
      },
      {
        path: PATH.payment_pol,
        element: <PaymentPolicies />
      },
      {
        path: PATH.purchase_pol,
        element: <PurchasePolicies />
      },
      {
        path: PATH.security_pol,
        element: <SecurityPolicies />
      },
      {
        path: PATH.stock_pol,
        element: <StockPolicies />
      },
      {
        path: PATH.collab_sup,
        element: <Collaborator />
      },
      {
        path: PATH.exchange_sup,
        element: <ExchangeReturn />
      },
      {
        path: PATH.gift_sup,
        element: <Gift />
      },
      {
        path: PATH.inquiries_sup,
        element: <Inquiries />
      },
      {
        path: PATH.payment_sup,
        element: <Payment />
      },
      {
        path: PATH.retail_sup,
        element: <RetailAdvice />
      },
      {
        path: PATH.size_sup,
        element: <Size />
      },
      {
        path: PATH.blog,
        element: <Blog />
      },
      {
        path: PATH.blogDetail,
        element: <BlogDetail />
      },
      {
        path: PATH.contact,
        element: <Contact />
      },
      {
        path: PATH.cart,
        element: <Cart />
      },
      {
        path: PATH.productDetail,
        element: <ProductDetail />
        },
      {
        path: PATH.storeSystem,
        element: <StoreSystem />,
      },
      {
        path: PATH.searchProduct,
        element: <ProductSearch />,
      }
    ]
  }
])

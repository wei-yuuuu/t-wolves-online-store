import React from 'react'
import Router from 'next/router'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import StripeCheckout from 'react-stripe-checkout'
import NProgress from 'nprogress'

import calcTotalPrice from '../lib/calcTotalPrice'
import User, { CURRENT_USER_QUERY } from './User'

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
}

class TakeMyMoney extends React.Component {
  onToken = async (res, createOrder) => {
    NProgress.start()
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message)
    })
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    })
  }
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {createOrder => (
              <StripeCheckout
                amount={calcTotalPrice(me.cart)}
                name="Minny T-Wolves"
                description={`Order of ${totalItems(me.cart)} items!`}
                image={
                  me.cart.length && me.cart[0].item && me.cart[0].item.image
                }
                stripeKey="pk_test_VFtcELVbHsml7J4VluZpNf5m00R9TTGCAV"
                currency="USD"
                email={me.email}
                token={res => this.onToken(res, createOrder)}
              >
                {this.props.children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    )
  }
}

export default TakeMyMoney

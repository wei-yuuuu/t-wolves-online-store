import React from 'react'
import { Mutation } from 'react-apollo'
import StripeCheckout from 'react-stripe-checkout'
import gql from 'graphql-tag'

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
  onToken = (res, createOrder) => {
    console.log(res.id)
    createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message)
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
                image={me.cart[0].item && me.cart[0].item.image}
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

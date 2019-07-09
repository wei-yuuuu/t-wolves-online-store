import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import calcTotalPrice from '../lib/calcTotalPrice'
import User from './User'

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
}

class TakeMyMoney extends React.Component {
  onToken = res => {
    console.log(res.id)
  }
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Minny T-Wolves"
            description={`Order of ${totalItems(me.cart)} items!`}
            image={me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_VFtcELVbHsml7J4VluZpNf5m00R9TTGCAV"
            currency="USD"
            email={me.email}
            token={res => this.onToken(res)}
          >
            {this.props.children}
          </StripeCheckout>
        )}
      </User>
    )
  }
}

export default TakeMyMoney

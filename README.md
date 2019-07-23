### Minny T-Wolves
Minnesota Timberwolves' s online store.<br>
The project for the Advanced React & GraphQL course by Wes Bos.

#### Frontend
- react v16.5.2
- next v7.0.0 (server side rendering)
- graphql v14.0.2 
- apollo-client v2.4.5 (graphQL client)
- styled-components v3.4.9 (styles)
- react-transition-group v2.5.0 (animation)
- nprogress v0.2.0 (progress bar)
- downshift v2.2.3 (autocomplete)
- lodash.debounce v4.0.8 (typing performance)

#### Backend
- graphql v0.13.2
- graphql-yoga v1.16.2 (graphQL server)
- prisma v1.17.1 (database)

#### Functionality
- member
  - signup
  - signin
  - signout
  - resetPassword (nodemailer, mailtrap for sending resetRequest)
  - updatePermissions
  - jwt authentication
- item
  - createItem (cloudinary for uploading images)
  - updateItem
  - deleteItem
  - pagination
- cart
  - addToCart
  - removeFromCart
  - toggleCart
- order
  - createOrder (stripe)

#### Third party API
- Stripe API
- Mailtrap API
- Cloudinary API

import SingleItem from '../components/SingleItem'

const item = ({ query }) => (
  <div>
    <SingleItem id={query.id} />
  </div>
)

export default item

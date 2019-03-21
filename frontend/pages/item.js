import SingleItem from '../components/SingleItem'

const item = props => (
  <div>
    <SingleItem id={props.query.id} />
  </div>
)

export default item

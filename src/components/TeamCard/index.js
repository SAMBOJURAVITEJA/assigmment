import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {each} = props

  return (
    <Link className="link" to={`/team-matches/${each.id}`}>
      <li key={each.id} className="teamCardContainer">
        <img
          className="cardImage"
          src={each.teamImageUrl}
          alt={`${each.name}`}
        />
        <p>{each.name}</p>
      </li>
    </Link>
  )
}
export default TeamCard

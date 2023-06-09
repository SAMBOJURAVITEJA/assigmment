import './index.css'

const MatchCard = props => {
  const {each} = props
  const Active = each.matchStatus === 'Won' ? 'green' : 'red'
  return (
    <li className="matchCardListItem">
      <img
        src={each.competingTeamLogo}
        className="MatchCardLogo"
        alt={`competing team ${each.competingTeam}`}
      />
      <h1>{each.competingTeam}</h1>
      <p>{each.result}</p>
      <h1 className={`${Active}`}>{each.matchStatus}</h1>
    </li>
  )
}

export default MatchCard

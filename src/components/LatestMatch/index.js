import './index.css'

const LatestMatches = props => {
  const {each} = props
  return (
    <div className="latestMatchContainer">
      <div className="leftSideContainer">
        <p>{each.competingTeam}</p>
        <p>{each.date}</p>
        <p>{each.venue}</p>
        <p>{each.result}</p>
      </div>
      <div className="middleImageContainer">
        <img
          className="latestImage"
          src={each.competingTeamLogo}
          alt={`latest match ${each.competingTeam}`}
        />
      </div>
      <div className="rightSideContainer">
        <h1>First Innings</h1>
        <p>{each.firstInnings}</p>
        <h1>Second Innings</h1>
        <p>{each.secondInnings}</p>
        <h1>Man Of The Match</h1>
        <p>{each.manOfTheMatch}</p>
        <h1>Umpires</h1>
        <p>{each.umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatches

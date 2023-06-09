import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'
import './index.css'

class TeamMatches extends Component {
  state = {
    loading: true,
    teamMatches: [],
  }

  componentDidMount() {
    this.getCardDetails()
  }

  getCamelCase = result =>
    result.map(each => ({
      umpires: each.umpires,
      result: each.result,
      manOfTheMatch: each.man_of_the_match,
      id: each.id,
      date: each.id,
      venue: each.venue,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      firstInnings: each.first_innings,
      secondInnings: each.second_innings,
      matchStatus: each.match_status,
    }))

  getCardDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const cardUrl = `https://apis.ccbp.in/ipl/${id}`

    const response = await fetch(cardUrl)
    if (response.ok) {
      const result = await response.json()
      const convertedResult = {
        teamBannerUrl: result.team_banner_url,
        latestMatchDetails: {
          umpires: result.latest_match_details.umpires,
          result: result.latest_match_details.result,
          manOfTheMatch: result.latest_match_details.man_of_the_match,
          id: result.latest_match_details.id,
          date: result.latest_match_details.id,
          venue: result.latest_match_details.venue,
          competingTeam: result.latest_match_details.competing_team,
          competingTeamLogo: result.latest_match_details.competing_team_logo,
          firstInnings: result.latest_match_details.first_innings,
          secondInnings: result.latest_match_details.second_innings,
          matchStatus: result.latest_match_details.match_status,
        },
        recentMatches: this.getCamelCase(result.recent_matches),
      }
      this.setState(prevState => ({
        loading: !prevState.loading,
        teamMatches: convertedResult,
      }))
    }
  }

  renderResultView = () => {
    const {teamMatches} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatches
    return (
      <div className="cardTeamMatchIplContainer">
        <div className="TeamMatchImageContainer">
          <img className="TeamImage" src={teamBannerUrl} alt="team banner" />
        </div>
        <p>Latest Matches </p>
        <LatestMatch each={latestMatchDetails} />
        <ul className="matchCardContainer">
          {recentMatches.map(each => (
            <MatchCard each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSwitchCase = id => {
    switch (id) {
      case 'KKR':
        return 'kkr'

      case 'RCB':
        return 'rcb'

      case 'MI':
        return 'mi'

      case 'CSK':
        return 'csk'

      case 'RR':
        return 'rr'

      default:
        return 'srh'
    }
  }

  renderLoadingView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const className = this.renderSwitchCase(id)
    return (
      <div className={`TeamMatchContainer ${className}`}>
        <div testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
        </div>
      </div>
    )
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const className = this.renderSwitchCase(id)
    const {loading} = this.state
    return (
      <div className={`TeamMatchContainer ${className}`}>
        {loading ? this.renderLoadingView() : this.renderResultView()}
      </div>
    )
  }
}

export default TeamMatches

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    loading: true,
    teamCard: [],
  }

  componentDidMount() {
    this.getCardDetails()
  }

  getCamelCase = result =>
    result.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))

  getCardDetails = async () => {
    const teamApiUrl = 'https://apis.ccbp.in/ipl'

    const response = await fetch(teamApiUrl)
    if (response.ok === true) {
      const result = await response.json()
      const convertedResult = {teams: this.getCamelCase(result.teams)}
      this.setState(prevState => ({
        loading: !prevState.loading,
        teamCard: convertedResult,
      }))
    }
  }

  renderLoadingView = () => (
    <div className="homeContainer">
      <div testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
      </div>
    </div>
  )

  renderResultView = () => {
    const {teamCard} = this.state
    const {teams} = teamCard
    return teams.map(each => <TeamCard key={each.id} each={each} />)
  }

  render() {
    const {loading} = this.state
    return (
      <div className="homeContainer">
        <div className="iplContainer">
          <div className="iplLogoContainer">
            <img
              className="iplLogoImage"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1>IPL Dashboard</h1>
          </div>
          <ul className="iplCardsContainer">
            {loading ? this.renderLoadingView() : this.renderResultView()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home

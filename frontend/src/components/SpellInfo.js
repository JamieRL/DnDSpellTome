import React from 'react'
import styled from 'styled-components'

const Spell = styled.div`
  text-align: left;
  margin-left: 1rem;
  width: 80vw;
`
const FavouriteToggle = styled.p`

  float: right;
  color: #e62212;
  border: 1px solid #e62212;
  border-radius: 1px;
  padding: 0.2rem;
  margin: 1rem;
  text-align: center;
`

const FavouriteToggled = styled.p`

  float: right;
  color: black;
  background-color: #e62212;
  border: 1px solid #e62212;
  border-radius: 1px;
  padding: 0.2rem;
  margin: 1rem;
  text-align: center;
`

const Top = styled.div`
  width: 80vw;
  height: 2rem;
  margin-bottom: 2rem;
  h3 {
    width: 30vw;
    float: left;
  }
`

class SpellInfo extends React.Component {

  render() {
    const favouriteUntoggled = (
      <FavouriteToggle>Favourite</FavouriteToggle>
    )
    const favouriteToggled = (
      <FavouriteToggled>Favourite</FavouriteToggled>
    )
    const components = this.props.spell.components.map(component => component)
    return (
      <Spell>
        <Top>
          <h3>{this.props.spell.name}</h3>
          {this.props.isFavourite ? favouriteToggled : favouriteUntoggled }
        </Top>

        <p>{'Casting Time: '+this.props.spell.casting_time}</p>
        <p>{'Description: '+this.props.spell.desc}</p>
        <p>{'Components: '+components}</p>
      </Spell>
    )
  }
}

SpellInfo.defaultProps = {
  isFavourite: false
}
export default SpellInfo

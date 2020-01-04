import React from 'react'
import styled from 'styled-components'

const Spell = styled.div`
  text-align: left;
  margin-left: 1rem;
  width: 80vw;
`
const FavouriteToggle = styled.p`
  width: 15vw;
  float: right;
  color: #e62212;
  border: 1px solid #e62212;
  border-radius: 1px;
  padding: 0.2rem;
  margin: 1rem;
  text-align: center;
`

const FavouriteToggled = styled.p`
  width: 15vw;
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
  p {
    width: 20vw;
    float: left;
  }
`

class SpellList extends React.Component {

  renderSpell() {
    console.log(this.props.spell)
    const components = this.props.spell ? this.props.spell.components.map(component => component) : null
    return (
      <Spell>
        <Top>
          <p>{'Name: '+this.props.spell.name}</p>
          <FavouriteToggle>Favourite</FavouriteToggle>
        </Top>

        <p>{'Casting Time: '+this.props.spell.casting_time}</p>
        <p>{'Description: '+this.props.spell.desc}</p>
        <p>{'Components: '+components}</p>
      </Spell>
    )
  }
  render() {
    return (
      <>
        {this.props.spell ? this.renderSpell() : null}
      </>
    )
  }
}

export default SpellList

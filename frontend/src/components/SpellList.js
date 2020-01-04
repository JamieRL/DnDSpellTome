import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
  list-style-type:none;
  display: inline-block;
  padding-inline-start: 0;
  text-align: left;
  margin-left: 1rem;
  width: 80vw;
`

const Spell = styled.li`

`
class SpellList extends React.Component {

  renderSpell() {
    console.log(this.props.spell)
    const components = this.props.spell ? this.props.spell.components.map(component => <span>{component}</span>) : null
    return (
      <Spell>
        <p>{'Name: '+this.props.spell.name}</p>
        <p>{'Casting Time: '+this.props.spell.casting_time}</p>
        <p>{'Description: '+this.props.spell.desc}</p>
        {components}
      </Spell>
    )
  }
  render() {
    return (
      <List>
        {this.props.spell ? this.renderSpell() : null}
      </List>
    )
  }
}

export default SpellList

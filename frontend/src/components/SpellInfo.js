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

const FIELDS = [{label: 'Name', value:'name' }, {label:'Description', value: 'desc'}, {label:'Higher Level', value: 'higher_level'},
                {label:'Range', value: 'range'}, {label:'Components', value: 'components'}, {label:'Materials', value: 'material'},
                {label:'Ritual', value: 'ritual'}, {label:'Duration', value:'duration'}, {label:'Concentration', value: 'concentration'},
                {label:'Casting Time', value: 'casting_time'}, {label:'Level', value: 'level'}, {label: 'School', value: 'school'},
                {label:'Classes', value: 'dnd_class'}]

class SpellInfo extends React.Component {

  render() {
    const favouriteUntoggled = (
      <FavouriteToggle>Favourite</FavouriteToggle>
    )
    const favouriteToggled = (
      <FavouriteToggled>Favourite</FavouriteToggled>
    )
    console.log(this.props.spell)
    const fields = FIELDS.map((field, index) => {
      console.log('field', field.value)
      return <p key={index}>{field.label+': '+this.props.spell[field.value]}</p>
    })
    return (
      <Spell>
        <Top>
          <h3>{this.props.spell.name}</h3>
          {this.props.isFavourite ? favouriteToggled : favouriteUntoggled }
        </Top>

        {fields}
      </Spell>
    )
  }
}

SpellInfo.defaultProps = {
  isFavourite: false
}
export default SpellInfo

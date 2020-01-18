import React from 'react'
import styled from 'styled-components'
const whiteHeart = '\u2661';
const blackHeart = '\u2665';

const Spell = styled.div`
  text-align: left;
  width: 100vw;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
  padding-top:1rem;
  padding-bottom: 1rem;
  h3 {
    margin-left: 1rem;
  }
  p {
    margin-left: 1rem;
  }

`

const FavouriteToggle = styled.p`

  float: right;
  color: #e62212;
  border: 1px solid #e62212;
  border-radius: 1px;
  padding: 0.2rem;
  margin: 1rem;
  width:1.2rem;
  text-align: center;
`

const Top = styled.div`
  width: 100%;
  height: 2rem;
  div {
    width: 85%;
    display:inline-block;
  }
  h3 {
    width: auto;
    float: left;
    margin:0;
    margin-left:1rem;

  }
  .toggle {
    width:10%;
    margin: 0;
    margin-left: 1rem;
  }
  p {
    margin:0;
    margin-right: 1rem;
  }
`

const FIELDS = [{label: 'Name', value:'name' }, {label:'Description', value: 'desc'}, {label:'Higher Level', value: 'higher_level'},
                {label:'Range', value: 'range'}, {label:'Components', value: 'components'}, {label:'Materials', value: 'material'},
                {label:'Ritual', value: 'ritual'}, {label:'Duration', value:'duration'}, {label:'Concentration', value: 'concentration'},
                {label:'Casting Time', value: 'casting_time'}, {label:'Level', value: 'level'}, {label: 'School', value: 'school'},
                {label:'Classes', value: 'dnd_class'}]

class SpellInfo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: true
    }
  }

  toggleCollapsed() {
    this.setState({isCollapsed: !this.state.isCollapsed})
  }

  render() {
    const fields = FIELDS.map((field, index) => {
      return <p key={index}>{field.label+': '+this.props.spell[field.value]}</p>
    })

    const collapsedToggle = (
      <h3 className="toggle" >&#8593;</h3>
    )
    const collapseToggle = (
      <h3 className="toggle" >&#8595;</h3>
    )
    return (
      <Spell>
        <Top>
          <div onClick={() => this.toggleCollapsed()}>
            <h3 >{this.props.spell.name}</h3>
            {this.state.isCollapsed ? collapsedToggle : collapseToggle}
          </div>
          <FavouriteToggle onClick={() => this.props.toggleFavourite(this.props.spell.name, this.props.spell.slug)}>{this.props.isFavourite ? blackHeart : whiteHeart}</FavouriteToggle>

        </Top>

        {this.state.isCollapsed ? null : fields}
      </Spell>
    )
  }
}

SpellInfo.defaultProps = {
  isFavourite: false
}
export default SpellInfo

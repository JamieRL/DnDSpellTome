import styled from 'styled-components'

const SearchBox = styled.input`
  text-align:center;
`
const Main = styled.div`
  margin-top: 10vh;
  button {
    margin-top: 1rem;
  }
  .heart {
    color: #e62212;
  }
  .noFavourites {
    width: 65vw;
    margin: auto;
  }
`
const TabList = styled.ul`
  list-style-type:none;
  display: inline;
  margin-bottom: 1rem;
  padding-inline-start: 0;
`
const Tab = styled.li`
  display:inline-block;
  color: #e62212;
  border: 1px solid #e62212;
  border-radius: 1px;
  padding: 0.3rem;
  margin: 1rem;
`

const TabSelected = styled.li`
  display:inline-block;
  color: black;
  background-color: #e62212;
  border: 1px solid #e62212;
  border-radius: 1px;
  padding: 0.3rem;
  margin: 1rem;
`

const SearchButton = styled.h3`
  color:white;
  border: 1px solid #ffffff;
  border-radius: 0.5px;
  width: 20%;
  margin:auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
`
export {
  Tab,
  TabSelected,
  Main,
  SearchBox,
  TabList,
  SearchButton
}

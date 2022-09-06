import './Header.css'
import logo from './Images/circuit.png'
const Header = ({title}) => {

        
  return (
    <header className="Header">
      <h1>{title}</h1>
      <img src={logo} alt="logo"/>
    </header>
  )
}

export default Header
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return(
        <nav className='navbar'>
            <NavLink 
            to='/'
            className={({isActive})=>{
                return(
                    isActive ? 'link active' : 'link'
                )
            }}
            >Home</NavLink>


            <NavLink 
            to='/about'
            className={({isActive})=>{
                return(
                    isActive ? 'link active' : 'link'
                )
            }}
            >About</NavLink>

            <NavLink 
            to='/products'
            className={({isActive})=>{
                return(
                    isActive ? 'link active' : 'link'
                )
            }}
            >Products</NavLink>


            <NavLink 
            to='/login'
            className={({isActive})=>{
                return(
                    isActive ? 'link active' : 'link'
                )
            }}
            >Login</NavLink>

        </nav>
    )
}

export default Navbar
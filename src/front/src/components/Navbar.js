import { useDispatch, useSelector } from "react-redux"

import { Increment, Decrement } from "../redux/actions"


const Navbar = () => {
    const value = useSelector(state => state.initialValue)
    const dispatch = useDispatch()

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Segify</span>
                </div>
            </nav>
        </>
    )
}

export default Navbar
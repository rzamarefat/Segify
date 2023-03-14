import { useDispatch, useSelector } from "react-redux"

import { Increment, Decrement } from "../redux/actions"


const Navbar = () => {
    const value = useSelector(state => state.initialValue)
    const dispatch = useDispatch()

    return (
        <>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">Segify</span>
                </div>
            </nav>
        </>
    )
}

export default Navbar
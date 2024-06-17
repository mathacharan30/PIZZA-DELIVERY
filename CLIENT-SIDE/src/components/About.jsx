import { useSelector } from 'react-redux';

export const About=()=>{

    const state = useSelector(state => state.authUser);
    console.log(state.user);
    return(
        <div>
            <h1>About Page</h1>
        </div>
    )
}
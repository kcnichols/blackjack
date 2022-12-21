import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <h1>
                Blackjack
            </h1>
            <div>
                <Outlet />
            </div>
        
        </>
    )
}
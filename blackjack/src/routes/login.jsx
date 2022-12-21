import Login from '../components/login';

export default function LoginRoute(props) {
    return (
        <>
            <div>
                <Login 
                    username={props.username} 

                />
            </div>

        </>
    )
}
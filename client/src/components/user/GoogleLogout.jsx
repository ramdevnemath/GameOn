const googleLogout = () => {

    const onSuccess = () => {
        console.log("Logout succesful")
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={client_id}
                buttonText={"LogOut"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default googleLogout
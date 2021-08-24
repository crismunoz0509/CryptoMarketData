const APIController = (function () {

    const clientID = '';
    const clientSecret = '';

    //private methods
    const _getToken = async () => {
        
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method:'POST',
            headers: {
                'Content'
            }
        })

    }

})();
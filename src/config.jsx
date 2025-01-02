const Configurl = {
    Url : "https://test.bxoks.online",
    headers: () => {
        return{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('BX_Token'),
            },
        };
    },
}

export default Configurl
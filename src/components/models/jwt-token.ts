class JwtToken{
    accessToken: string;
    refreshToken: string;

    constructor(accessToken: string, refreshToken: string){
        const prifix: string = 'Bearer ';
        
        this.accessToken = prifix + accessToken;
        this.refreshToken = prifix + refreshToken;
    }
}

export default JwtToken
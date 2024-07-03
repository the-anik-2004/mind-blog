import confEnv from '../config/confEnv';
import { Client,Account,ID} from 'appwrite';
export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
                .setEndpoint(confEnv.appwriteUrl)
                .setProject(confEnv.appwriteProjectId);
        this.account=new Account();
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another method
                this.login({email,password});
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            throw error;
        }
    }


    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service ::  getCurrentUser :: error",error);
        }
        return null;
    }

}

const authService=new AuthService();

export default authService;

//DOCS: https://appwrite.io/docs/products/auth
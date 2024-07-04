import confEnv from "../config/confEnv";
import {Client,ID,Databases,Storage,Query} from 'appwrite';

export class DBservice{
 client= new Client();
 databases;
 storage;

 constructor(){
    this.client.setEndpoint(confEnv.appwriteUrl)
                .setProject(confEnv.appwriteProjectId);
    this.databases=new Databases(this.client);
    this.storage=new Storage(this.client);
 }

 async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(confEnv.appwriteDatabaseId,confEnv.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                });
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
 }

 async updatePost(slug,{title,content,featuredImage,status}){
    try {
        return await this.databases.updateDocument(
            confEnv.appwriteDatabaseId,
            confEnv.appwriteCollectionId,
            slug,
            {title,content,featuredImage,status}
        );
        
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error",error);
    }
 }

 async deletePost(slug){
    try {
            await this.deletePost( 
            confEnv.appwriteDatabaseId,
            confEnv.appwriteCollectionId,
            slug,   
        );
        return true;
        //As I am deleting the post there is no need to return the post which has been deleted instead of that I am returning a boolean value which is true which indicates that the post is successfully deleted.
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error",error);
        return false;
    }
 }

}

const dbservice=new DBservice();
export default dbservice;
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
            await this.databases.deleteDocument( 
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

 async getPost(slug){
    try {
        return await this.databases.getDocument(
            confEnv.appwriteDatabaseId,
            confEnv.appwriteCollectionId,
            slug
        );
    } catch (error) {
        console.log("Appwrite Service :: getPost :: error",error);
        return false;
    }
 }

 async getPosts(queries=[
    Query.equal("status","active")
 ]){

    try {
        return await this.databases.listDocuments(
            confEnv.appwriteDatabaseId,
            confEnv.appwriteCollectionId,
            queries,
        )
    } catch (error) {
        console.log("Appwrite service :: getPosts :: error",error);
        return false;
    }
 }

 //file upload service

 async uploadFile(file){
    try {
        return await this.storage.createFile(
            confEnv.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("appwrite service:: uploadFile :: error",error);
        return false;
    }
 }

 async deleteFile(fileId){
    try {
        await this.storage.deleteFile(confEnv.appwriteBucketId,fileId);
        return true;
    } catch (error) {
        console.log("appwrite service :: deletefile ::error",error);
        return false;
    }
 }


 getFilePreview(fileId){
    return this.storage.getFilePreview(confEnv.appwriteBucketId,fileId);
 }//Here we don't use async await because the response time of get file preview method is very fast so there is no need to use async await

}//https://appwrite.io/docs/references/cloud/client-web/databases

const dbservice=new DBservice();
export default dbservice;
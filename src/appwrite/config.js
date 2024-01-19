import conf from "../conf/conf";
import { Client,  ID , Databases , Storage , Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client);;
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredimage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost( slug ,{title , content , featuredimage , status ,userId}){
        try {
            return await this.databases.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {title , content , featuredimage , status ,userId});

        } catch (error) {
            console.log("Appwrite :: config.js :: updatePost :: " , error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId, 
                slug
                );
            return true
        } catch (error) {
            console.log("Appwrite :: config.js :: deletePost :: " , error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId, 
                slug
                );
        } catch (error) {
            console.log("Appwrite :: config.js :: getPost :: " , error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //file upload
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file 
            )
            
        } catch (error) {
            console.log("Appwrite error :: config.js :: upload file :: " , error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite :: config.js :: deleteFile :: " , error)
            return false
        }
    }

    getFilePreview(id) {
        try {
            return this.bucket.getFilePreview(
                conf.appWriteBucketId,
                id  // Fix the parameter name here
            );
        } catch (error) {
            console.log("Appwrite :: config.js :: getFilePreview :: ", error);
        }
    }
    


}

const service = new Service();

export default service;
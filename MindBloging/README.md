# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Steps to be Followed

# STEP-1️⃣
 *Environment Variable must be in the Root directory.And it should start with (.) Eg:-``` .env ```

 Env file load only once usally ,so whenver you have update in env file you have close the project once then reopen the project.

 To prevent accidentally leaking env variables to the client, only variables prefixed with 'VITE_' are exposed to your Vite-processed code. e.g. for the following env variables:
```
 VITE_SOME_KEY=123
 DB_PASSWORD=foobar
```
ACCESS:
Only VITE_SOME_KEY will be exposed as 'import.meta.env.VITE_SOME_KEY' to your client source code, but DB_PASSWORD will not.

```
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```


# STEP-2️⃣
TAKE all the environment variables from the Backend as a service(here AppWrite)

create a seperate folder as config and store all the env variable in an object by stringfying them...it is good practice and as well as to hide the sensitive info.

All the required environment variables are defined in (.env.sample)


# STEP-3️⃣
Here Services are made for 'CreateUser','login','logout', 'getUser' by making a structure of Class and each time a new user is created or registered an instance of that class is created as a object. 

Path: (src/appwrite/auth.js)

For more info check out: https://appwrite.io/docs/products/auth


# STEP-4️⃣
Here we configure the appwrite service databases like 'createPost','updatePost','deletePost','getPost' and file uploading services like 'uploadFile','deleteFile','getPreviewFile'. 

Path: (src/appwrite/config.js)

For more info check out://appwrite.io/docs/references/cloud/client-web/databases

while retrieving post based upon the status using getPost() method we have to write query:

```markdown
```javascript
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
``````

For more Queries :https://appwrite.io/docs/products/databases/queries



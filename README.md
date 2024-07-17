# mind-bloging
 It is a Blog App using React-JS .A complete sum up of learning all react's concept in a single project

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Steps to be Followed

## STEP-1️⃣
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


## STEP-2️⃣
TAKE all the environment variables from the Backend as a service(here AppWrite)

create a seperate folder as config and store all the env variable in an object by stringfying them...it is good practice and as well as to hide the sensitive info.

All the required environment variables are defined in (.env.sample)


## STEP-3️⃣
Here Services are made for 'CreateUser','login','logout', 'getUser' by making a structure of Class and each time a new user is created or registered an instance of that class is created as a object. 

Path: (src/appwrite/auth.js)

For more info check out: https://appwrite.io/docs/products/auth


## STEP-4️⃣
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
```



For more Queries :https://appwrite.io/docs/products/databases/queries


## STEP-5️⃣
Here State management is done  by using Redux Toolkit,and make the basic outlet in App.jsx and configure provider.
Configure the store to manage the states. 


## STEP-6️⃣
After above mentioned setups ,let us deep dive in component maikng .Main focus is reusiblity of components
for smooth and future proof acrhitecture.

In this given below syntax {value && ()}
if 'value' is 'true' then only the part in () is valid or redered further.

```markdown
```javascript 
    {authStatus && (  <li><LogoutBtn/></li>  )} //if authService is   'true' then the list tag and LogoutBtn is visble
```

 
 Button desiging is shown below:
 ```markdown
 ```javascript
 function Button({
    children,type="button",
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props})
                     {
                    return (
                          <button 
                          className={`px-4 py-2 rounded-lg ${bgColor}
                           ${textColor} ${className} `}{...props}>
                              {children}
                          </button>
                     )
                    }
 ```

 Following similar kind of work-flow 'input' field of form and other redundant components will be designed.

 ## Concept of forwoard Reference in Input filed📌
 Whenever you are making use of different component but you want to refer them in same page you have use this concept.

 Suppose we are making a law in firm and there are two fields like email address and password and both the input fields are being fixed from our component of input.So as a result as the components are individually separated the current context of that components are different.By using forward reference we can take both the different components as a single one and use them. 

 ```markdown
 ```javascript
//syatax 1
    const Input=React.forwardRef(function Input({})
    { 
        return (
           <div>
            <Input className='xyz' type='xyz' />
            </div>)
    });
//syatax 2
    const Input=React.forwardRef( Input=({})=>
    { 
        return (
           <div>
            <Input className='xyz' type='xyz' />
            </div>)
    });

    //Syntax -3 [While exporting]
    function Input({})
    { 
        return (
           <div>
            <Input className='xyz' type='xyz' />
            </div>)
    };

    export default React.forwardRef(Input); 
 ```

## Select Component:
```Markdown
```javascript
import React,{useId} from 'react'

function Select({
    options,label,className='',...props
},ref) {
    const id=useId();
    return (
        <div className='w-full'>
            {label && 
            (<label htmlFor={id} className={`${className}`}> </label>)}

            <select {...props} id={id} ref={ref} className={`${className}`}>
                {options?.map((option)=>{
                    <option key={option} value={option}>
                        {option}
                    </option>
                })}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);

```

## STEP-7️⃣ 
Here Login and signup page is made using 'React-hook-form' [ https://www.react-hook-form.com/get-started/#SchemaValidation ].

Work based upon 'useForm()' which have 'register' and 'handleSubmit'.'handleSubmit' is method which is used to run your custom method when even submit is done.

```Markdown
```javascript
    <form onSubmit={handleSubmit (login)}>

    <Input/>

     <Button type="submit" className="w-full">Sign In</Button>

    </form>
```



Have knowledge about schemaValidation,applyValidation also have deep dived into vlidation part by using regular expression(RegEx) in register...
```markdown
```javascript
     <Input
        label='Email :'
        placeholder='Enter your Email...'
        type='email'
        {...register("email",{
                            required:true,
                            validate:{
                                    matchPatter:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)||
                                    "Email address must be a valid address",
                                }
                            }
                    )
        }/>
```

## STEP-8️⃣
Here authentication and security checking procedure is done.

```
Path:MindBloging/src/Components/AuthLayout.jsx
```

## STEP-9️⃣
Making the Real Time Editor(RTE) to handle real time data in form .Also know about concept of Controller of 'React Hook Form'.

"React Hook Form embraces uncontrolled components and native inputs, however it's hard to avoid working with external controlled component such as React-Select, AntD and MUI. This wrapper component will make it easier for you to work with them."[https://react-hook-form.com/docs/usecontroller/controller]

```markdown
```javascript
import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form';
function RTE({name,control,label,defaultValue=""}) {
    return (
        <div className='w-full'>
            {label && (<label  className='inline-block mb-1 pl-1'>{label}</label>)}
            <Controller
            name={name || "content"}
            control={control}
            render={({field:{onChange}})=>(
                <Editor
                initialValue={defaultValue}
                init={
                    {
                        height:500,
                        menubar:false,
                        plugins:[
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen','insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                        'undo redo | formatselect | bold italic underline| \
                        alignleft aligncenter alignright alignjustify| \
                        bullist numlist outdent indent |removeformat | help',
                        content_style:"body {font-family:Helvetica,Arial,san-serif;font-size:14px}"
                    }
                }
                onEditorChange={onChange}
                />
            )}
            />
        </div>
    )
}

export default RTE

```

## STEP-1️⃣0️⃣
Here we make post form ...one of the most crucial part to understand.

Just giving the entire code as it is more complex part of this application.
```markdown
```js
import React,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import{Button,Input,Select,RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostFrom({post}) {
    const{register,handleSubmit,watch,
        setValue,control,getValues}=useForm({
                                             defaultValues:{
                                                 title: post?.title||'',
                                                 slug:post?.slug||"",
                                                 status:post?.status||"active",
                                             }
                                         });
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.user.userData);

    const submit=async (data)=>{
        if(post){
            const file=data.image[0]?service.uploadFile(data.image[0]) : null;
            if(file){
                service.deleteFile(post.featuredImage)
            }
            const dbPost=await service.updatePost(post.$id,{...data,
                        featuredImage: file?file.$id:undefined});
            
            if(dbPost)navigate(`/post/${dbPost.$id}`);
        }else{
            const file= await service.uploadFile(data.image[0]);
            if(file){
                const fileId=file.$id;
                data.featuredImage=file;
                const dbpost=await service.createPost({...data,userId:userData.$id});
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value)=>{
                                                if(value && typeof value==='string')
                                                    return value.trim().toLowerCase().replace(/^[a-zA-Z\d]+/g,"-");
                                                return '';
                                            },[])


    React.useEffect(()=>{
        const subscription=watch((value,name)=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title),{shouldValidate:true});
            }
        })

        return ()=>{subscription.unsubscribe()}
    },[watch,slugTransform,setValue]);


    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='"w-2/3 pc-2'>
                <Input
                    label="Title :"
                    placeholder="enter post title"
                    className="mb-4"
                    {...register("title",{required:true})}
                />
                <Input
                    label="Slug :"
                    placeholder="slug"
                    className="mb-4"
                    {...register('slug',{validate:true})}

                    onInput={(e)=>{
                        setValue('slug',slugTransform(e.currentTarget.value),{
                            shouldValidate:true});
                    }}
                />
                <RTE label="content :"
                name="content" control={control} defaultValues={getValues("content")}/>
            </div>
            <div className='w-1/3 px-2'>
                <Input
                    label="featured Image"
                    type="file"
                    className='mb-4'
                    accept="image/png ,image/jpg, image/jpeg, image/gif"
                    {...register('image',{required:!post})}
                />

            </div>
            {post && (
                <div className='w-full mb-4'>
                    <img src={service.getFilePreview(post.featuredImage)}
                     alt={post.title}
                     className='rounded-lg' />
                </div>
            )}
            <Select
                options={["active","inactive"]}
                label="Status"
                className="mb-4"
                {...register("status",{required:true})}
            />

            <Button
            type="submit"
            bgColor={post?"bg-green-500" : undefined}
            className="w-full"
            >
                {post? "Update" : "Submit"}
                </Button>

        </form>
        
    )
}

export default PostFrom

```

## STEP-1️⃣1️⃣
Here all the required pages are built using the components.The pages are like -Home ,AddPost,EditPost etc.


Path: MindBlog/src/pages

## STEP-1️⃣2️⃣
Here all the routing are being made to navigate from a page to another page by using react-router.

```md
```javascript
import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store.js';
import {AuthLayout,Login } from './Components'
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AddPost from "./pages/AddPost.jsx";
import Signup from './pages/Signup.jsx'
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPosts.jsx";

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
                {
                  path:'/',
                  element:<Home/>
                },
                {
                  path:'/login',
                  element:(
                    <AuthLayout authentication={false}>
                        <Login/>
                    </AuthLayout>
                  )
                },
                {
                  path:'/signup',
                  element:(
                    <AuthLayout authentication={false}>
                        <Signup/>
                    </AuthLayout>
                  )
                },
                {
                  path:'/all-posts',
                  element:(
                    <AuthLayout authentication>
                        {" "}
                        <AllPosts/>
                    </AuthLayout>
                  )
                },
                {
                  path:'/add-post',
                  element:(
                    <AuthLayout authentication>
                        {" "}
                        <AddPost/>
                    </AuthLayout>
                  )
                },
                {
                  path:'/edit-post:slug',
                  element:(
                    <AuthLayout authentication>
                        {" "}
                        <EditPost/>
                    </AuthLayout>
                  )
                },
                {
                  path:'/post/:slug',
                  element:<Post/>
                },
            ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    
  </React.StrictMode>,
)

```

## STEP-1️⃣3️⃣

Here we debug the codebase and after that deploy it.


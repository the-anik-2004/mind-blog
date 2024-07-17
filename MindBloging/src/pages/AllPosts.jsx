import React,{useState,useEffect} from 'react'
import {PostCard,Container} from '../Components'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts,setPosts]=useState([]);

    // useEffect(()=>{
    //     const fetchPosts=async ()=>{
    //         try {
    //             const response=await appwriteService.getPosts();
    //             if(response){
    //                 setPosts(response.documents);
    //             }
                
    //         } catch (error) {
    //             console.error('Failed to fetch posts:', error);
    //             throw error;
    //         }
    //     }
    //     fetchPosts();
    // },[])
    //++++++++++++
    useEffect(()=>{},[]);
    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents);
        }
    })
    return (
        <div className='w-full py-8'>
            <Container>
               <div className='flex flex-wrap'>

                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))}
               </div>
            </Container>
        </div>
        
    )
}

export default AllPosts

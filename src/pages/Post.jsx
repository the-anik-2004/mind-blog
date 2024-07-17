import React,{useEffect,useState} from 'react'
import {useNavigate,useParams} from "react-router-dom"
import appwriteService from '../appwrite/config'
import {Button,Container} from '../Components'
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';


// const extractTextFromElements = (elements) => {
//     if (typeof elements === 'string') {
//       return elements;
//     }
  
//     if (Array.isArray(elements)) {
//       return elements.map(extractTextFromElements).join('');
//     }
  
//     if (typeof elements === 'object' && elements.props) {
//       return extractTextFromElements(elements.props.children);
//     }
  
//     return '';
//   };

function Post() {
    const [post,setPost]=useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        featuredImage: '',
        status: ''
    });

    const {slug} =useParams();
    const navigate=useNavigate();

    const userData =useSelector((state)=>state.auth.userData);
    
    const isAuthor = post &&
     userData?post.userId===userData.$id : false;

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){ 
                    setPost(post);
                    setFormData({
                        title: post.title,
                        content: post.content,
                        featuredImage: post.featuredImage,
                        status: post.status
                    });
                }
                else navigate("/");
            });
        }
    },[slug,navigate]);

    const deletePost=()=>{
        appwriteService.deletePost(post.$id).then((status)=>{
            if(status){
                appwriteService.deleteFile(post.featuredImage);
                navigate('/');
            }
        });
    }

    const savePost=()=>{
        appwriteService.updatePost(post.$id,formData).then((status)=>{
            if(status){
                setPost({...post,...formData});
                setIsEditing(false);
            }
        })
    }

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.content
        });
    }
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            {!isEditing ? (
                                   <>
                                   <Button bgColor="bg-green-500" className="mr-3" onClick={() => setIsEditing(true)}>
                                       Edit
                                   </Button>
                                   <Button bgColor="bg-red-500" onClick={deletePost}>
                                       Delete
                                   </Button>
                               </>
                            ): (
                                <>
                                <Button bgColor="bg-blue-500" className="mr-3" onClick={savePost}>
                                    Save
                                </Button>
                                <Button bgColor="bg-gray-500" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </>
                            )}
                            {/* <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3" >
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button> */}
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    {isEditing?(
                        <>
                              <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="text-2xl font-bold w-full p-4 "
                            />
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full p-4 "
                                rows="10"
                            />
                        </>
                    ):(
                        <>
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                            <div className="browser-css ">{parse(post.content)}</div>
                        </>
                    )}
                    {/* <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)} */}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post

import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form';
import confEnv from '../config/confEnv';


function RTE({name,control,label,defaultValue=""}) {
    const apikey=confEnv.tinymceApikey;
    console.log('TinyMCE API Key:', apikey);
    return (
        <div className='w-full'>
            {label && (<label  className='inline-block mb-1 pl-1'>{label}</label>)}
            <Controller
            name={name || "content"}
            control={control}
            render={({field:{onChange}})=>(
                <Editor
                apiKey={apikey}
                initialValue={defaultValue}
                init={
                    {   initialValue: defaultValue,
                        height:500,
                        menubar:true,
                        plugins:[
                            "advlist", "autolink", "lists", "link", "image", "charmap", 
                            "preview", "anchor", "searchreplace", "visualblocks", "code",
                            "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
                         ],
                        toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: 
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        readonly:false,
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

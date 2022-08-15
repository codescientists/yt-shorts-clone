import { SanityAssetDocument } from '@sanity/client'
import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { client } from '../utils/client'
import { MdDelete } from 'react-icons/md'
import useAuthStore from '../store/userStore'
import axios from 'axios'
import { useRouter } from 'next/router'

const Upload = () => {
    const [loading, setLoading] = useState<Boolean>()
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
    const [wrongFileType, setWrongFileType] = useState<Boolean>(false)
    const [savingPost, setSavingPost] = useState<Boolean>()
    const [caption, setCaption] = useState('')
    const [category, setCategory] = useState<String>('Coding')

    const { userProfile } = useAuthStore();



    const router = useRouter();

    const uploadVideo = (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

        // Uploading assets to sanity
        if (fileTypes.includes(selectedFile.type)) {
            setWrongFileType(false);
            setLoading(true);

            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name,
            }).then((data) => {
                setVideoAsset(data);
                setLoading(false)
            })
        }
    }

    const handlePost = async () => {
        if (caption && videoAsset?._id && category) {
            setSavingPost(true)

            const doc = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id,
                    },
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id,
                },
                category,
            }

            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, doc);

            router.push('/');
        }
    }

    if (userProfile) {
        return (
            <div className="pt-24 pl-40 flex items-center justify-center">
                <div>
                    <div className='mb-4'>
                        <p className='text-3xl font-bold'>Upload Video</p>
                        <p className='text-sm'>Post a video to you account</p>
                    </div>
                    <div className="border-2 border-dashed rounded h-[550px] w-[300px] flex flex-col justify-center items-center">
                        {loading ?
                            <p className='text-center text-3xl text-cyan-400 font-semibold'>
                                Uploading...
                            </p>
                            :
                            <div>
                                {!videoAsset ?
                                    <label htmlFor='u-video' className='cursor-pointer'>
                                        <div className='w-full h-full flex flex-col items-center justify-center'>
                                            <AiOutlineCloudUpload className='text-5xl' />
                                            <p>Select Video</p>
                                            <p>1080 x 1920</p>
                                            <p className="bg-cyan-400 h-10 rounded-md text-lg px-4 font-semibold flex items-center justify-center">Upload Video</p>
                                        </div>
                                        <input type="file" name='upload-video' id='u-video' onChange={uploadVideo} className="w-0 h-0" />
                                    </label>
                                    : <div className='rounded-3xl w-[300px] my-4 flex flex-col justify-center items-center'>
                                        <video
                                            className='rounded-xl h-[462px] bg-black'
                                            controls
                                            loop
                                            src={videoAsset?.url}
                                        />
                                        <div className=' flex justify-between px-10'>
                                            <p className='text-md'>{videoAsset?.originalFilename}</p>
                                            <button
                                                type='button'
                                                className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                                onClick={() => setVideoAsset(undefined)}
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </div>}
                            </div>
                        }
                        {wrongFileType && <p>please upload video</p>}
                    </div>
                </div>
                <div className='ml-10 w-80 '>
                    <div className='w-full'>
                        <p className='text-md font-semibold'>Caption</p>
                        <textarea name="caption" id="caption" onChange={(e) => setCaption(e.target.value)} className='w-full h-36 outline-none p-2'></textarea>
                    </div>
                    <div>
                        <p className="text-md font-semibold">Choose a category</p>
                        <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                            <option value="Coding">Coding</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Fullstack">Fullstack</option>
                            <option value="UI/UX">UI/UX</option>
                        </select>
                        <div className="mt-4 flex items-center">
                            <button className='border border-white rounded-md text-lg h-10 w-32 mr-6'>Discard</button>
                            <button disabled={videoAsset?.url ? false : true} onClick={handlePost} className='bg-cyan-500 rounded-md text-lg h-10 w-32'>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div className="pt-24 pl-40 flex items-center justify-center">
            <h2 className="text-2xl">Please Log in to upload video</h2>
        </div>
    }

}

export default Upload
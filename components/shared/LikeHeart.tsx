"use client"
import { addLike, removeLike, checkLiked } from '@/lib/actions/thread.actions';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
    userId: string;
    threadId: string;
    likes: number;
}

const LikeHeart = ({ userId, threadId, likes }: Props) => {
    const [url, seturl] = useState("/assets/heart-gray.svg")
    const [displayLikes, setDisplayLikes] = useState(likes)

    const handleLike = async () => {
        if (await checkLiked(threadId, userId)) {
            removeLike(threadId, userId);
            
            seturl('/assets/heart-filled.svg')
            setDisplayLikes(likes + 1)
        } else {
            addLike(threadId, userId)
            seturl('/assets/heart-gray.svg')
            setDisplayLikes(likes - 1)
        }
    }
    return (  
        <>
        <a onClick={() => {handleLike()}}>
        <Image src={url} alt="heart" width={24} height={24} className='cursor-pointer object-contain' />
        </a>
        {displayLikes > 0 && (
            <p className='text-gray-1 text-subtle-medium mt-1'>{displayLikes}</p>
        )} 
        </>  
    )


}

export default LikeHeart
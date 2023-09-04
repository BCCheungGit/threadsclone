"use client"

import Image from 'next/image';


interface Params {
    threadId: string;
    currentUserId: string;
    authorId: string;
    parentId: string | null;
    isComment?: boolean
}


const LikeThread = ({
    threadId,
    currentUserId,
    authorId,
    parentId,
    isComment,
}: Params) => {
    



}


export default LikeThread;
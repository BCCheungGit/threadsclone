"use client"

import Image from 'next/image';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
   
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'

import * as z from 'zod';
import { Input } from "../ui/input";


import { usePathname, useRouter } from 'next/navigation'



import { CommentValidation } from '@/lib/validations/thread';
import { addCommentToThread } from '@/lib/actions/thread.actions';
//import { createThread } from "@/lib/actions/thread.actions";

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}



const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
        }
    });


    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);
        

        form.reset();
    }
    
    return (
        <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)} 
            className="comment-form"
         >
            <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="items-center flex gap-3 w-full">
                <FormLabel>
                <Image
                    src={currentUserImg}
                    alt="Profile Image"
                    width={48}
                    height={48}
                    className='rounded-full object-cover'
                />
                </FormLabel>
                <FormControl className="border-none bg-transparent ">
                  <Input 
                    type="text"
                    placeholder="Reply to this post..."
                    className="no-focus text-light-1 outline-none"
                    {...field}
                    />
                </FormControl>
              </FormItem>
            )}
          />


          <Button className="comment-form_btn" type="submit">
                Comment
          </Button>
        </form>
        </Form>


    )
}

export default Comment;
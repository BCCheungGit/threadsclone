import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation'
import { fetchUser, getActivity} from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');


    //getActivity
    const activity = await getActivity(userInfo._id);


    return (
      <section>
          <h1 className="head-text">Activity</h1>
            <p className="!text-small-regular text-gray-1">
              Only activity within the last 12 hours will be shown
            </p>
          <section className="mt-10 flex flex-col gap-5">
            
            {activity[0].length > 0 || activity[1].length > 0 ? (
              <>
                {activity[0].map((activity) => (
                  <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                    <article className="activity-card">
                      <Image
                        src={activity.author.image}
                        alt="profile picture"
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                      <p className="!text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                          {activity.author.name}
                        </span>{" "}
                        replied to your thread
                      </p>
                    </article>
                  </Link>
                
                
                ))}
                {activity[1].map((activity) => (
                  <Link key={activity._id} href={`/thread/${activity._id.toString()}`}>
                    {activity.likedBy.map((likedUser:any)=>(
                      <article key={likedUser._id} className="activity-card">
                      <Image
                        src={likedUser.image}
                        alt="profile picture"
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                      <p className="!text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                          {likedUser.name}
                        </span>{" "}
                        liked your thread
                      </p>
                    </article>
                    ))}

                  </Link>
                
                
                ))}
              </>
            ): <p className="!text-base-regular text-light-3">No activity yet</p>}
          </section>
      </section>
    )
  }
  
  export default Page
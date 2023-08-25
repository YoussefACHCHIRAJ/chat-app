import { Skeleton } from "@/components/ui/skeleton"


const UserListSkeleton = () => {
  return (
    <>
    {[0,1,2,3].map(item => <div className="flex items-center w-full gap-2" key={item}>
        <Skeleton className="md:w-12 w-8 md:h-12 h-8 bg-lightGray rounded-full" />
        <Skeleton className="flex-1 bg-lightGray w-[100px] h-[40px] rounded-full" />
    </div>)}
    </>
  )
}

export default UserListSkeleton
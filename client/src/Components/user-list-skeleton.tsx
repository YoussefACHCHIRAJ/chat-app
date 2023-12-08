import { Skeleton } from "@/Components/ui/skeleton";

const UserListSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((item) => (
         <div key={item}
         className="flex gap-2 md:px-3 px-2 py-3 mx-[.1em] md:mx-0 text-sm rounded-xl items-center justify-start cursor-pointer"
       >
         <Skeleton className="md:w-12 w-8 md:h-12 h-8 bg-lightGray rounded-full" />
         <Skeleton className="flex-1 bg-lightGray w-[100px] h-[40px] rounded-full" />
       </div>
      ))}
    </>
  );
};


export default UserListSkeleton;

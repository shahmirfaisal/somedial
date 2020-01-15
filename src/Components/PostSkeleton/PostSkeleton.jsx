import React from "react";
import Skeleton from "react-loading-skeleton";

const PostSkeleton = () => {
  return (
    <section className="post">
      <Skeleton duration={1} circle={true} width={50} height={50} />
      <Skeleton duration={1} width={`100%`} height={90} />
      <Skeleton duration={1} width={`50%`} height={30} />
    </section>
  );
};

export default PostSkeleton;

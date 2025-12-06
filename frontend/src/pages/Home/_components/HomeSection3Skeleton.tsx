import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomeSection3Skeleton: React.FC = () => {
  return (
    <div>
      <Skeleton height={80} width={"40%"} className="mx-auto mb-5" />
      <Skeleton
        width={80}
        height={30}
        className="text-muted mx-auto mb-[16px] w-fit rounded-[10px] bg-[#e3e3e3] px-[10px] py-[5px]"
      />
      <div className="row items-center justify-between">
        <div className="col-sm-4">
          <Skeleton height={200} width={300} className="rounded-[20px]" />
        </div>
        <div className="col-sm-4">
          <Skeleton height={300} width={10} className="rounded-[20px]" />
        </div>
        <div className="col-sm-4">
          <Skeleton height={20} width={250} className="mb-2" />
          <Skeleton height={20} width={200} />
        </div>
      </div>
      <Skeleton
        width={150}
        height={30}
        className="mx-auto mt-[16px] mb-0 w-fit rounded-[10px] bg-[#e3e3e3] px-[10px] py-[5px]"
      />
    </div>
  );
};

export default HomeSection3Skeleton;

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomeSection2Skeleton: React.FC = () => {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="col-sm-8 mx-auto mt-[250px] text-start lg:mt-[300px]">
          <Skeleton height={20} width={150} className="mb-[30px]" />
          <Skeleton height={30} width={300} className="mb-[30px]" />
          <Skeleton height={20} width={400} />
        </div>
        <div className="col-sm-8 mx-auto mt-[250px] text-start lg:mt-[300px]">
          <Skeleton height={20} width={150} className="mb-[30px]" />
          <Skeleton height={30} width={300} className="mb-[30px]" />
          <Skeleton height={20} width={400} />
        </div>
        <div className="col-sm-8 mx-auto mt-[250px] mb-[100px] text-start lg:mt-[300px]">
          <Skeleton height={20} width={150} className="mb-[30px]" />
          <Skeleton height={30} width={300} className="mb-[30px]" />
          <Skeleton height={20} width={400} />
        </div>
      </div>
      <div className="col-sm-6">
        <Skeleton
          className="col-sm-10 sticky z-0 mt-[180px] aspect-6/4 max-h-[550px] rounded-[20px]"
          height={300}
        />
      </div>
    </div>
  );
};

export default HomeSection2Skeleton;

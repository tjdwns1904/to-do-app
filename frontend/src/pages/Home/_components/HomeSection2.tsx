function HomeSection2({ image }: { image: string }) {
  return (
    <>
      <div className="col-sm-6">
        <div className="col-sm-8 mx-auto mt-[250px] text-start lg:mt-[300px]">
          <p className="text-bold mb-[30px] text-sm text-red-500 lg:text-base">
            Clear your mind
          </p>
          <h2 className="mb-[30px] !text-[28px] !font-bold lg:!text-4xl">
            The fastest way to get tasks out of your head.
          </h2>
          <h3 className="text-secondary !text-lg !leading-[30px] lg:!text-xl">
            Type just about anything into the task field and TodoList’s
            one-of-its-kind natural language recognition will instantly fill
            your to-do list.
          </h3>
        </div>
        <div className="col-sm-8 mx-auto mt-[250px] text-start lg:mt-[300px]">
          <p className="text-bold mb-[30px] text-sm text-red-500 lg:text-base">
            Focus on what’s important
          </p>
          <h2 className="mb-[30px] !text-[28px] !font-bold lg:!text-4xl">
            Reach that mental clarity you’ve been longing for.
          </h2>
          <h3 className="text-secondary !text-lg !leading-[30px] lg:!text-xl">
            Your tasks are automatically sorted into Today, Upcoming, and custom
            Filter views to help you prioritize your most important work.
          </h3>
        </div>
        <div className="col-sm-8 mx-auto mt-[250px] mb-[100px] text-start lg:mt-[300px]">
          <p className="text-bold mb-[30px] text-sm text-red-500 lg:text-base">
            Get it all done
          </p>
          <h2 className="mb-[30px] !text-[28px] !font-bold lg:!text-4xl">
            Where work and personal tasks can finally coexist.
          </h2>
          <h3 className="text-secondary !text-lg !leading-[30px] lg:!text-xl">
            Tons of tasks, just one app. With workspaces, your personal, work,
            and team tasks can all live harmoniously under the same roof. (Sigh
            of relief).
          </h3>
        </div>
      </div>
      <div className="col-sm-6">
        <img
          src={image}
          alt=""
          className="col-sm-10 sticky top-[200px] z-0 mt-[180px] max-h-[550px] rounded-[20px] bg-black"
        />
      </div>
    </>
  );
}

export default HomeSection2;

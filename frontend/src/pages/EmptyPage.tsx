function EmptyPage() {
  return (
    <div className="h-[80vh]">
      <div className="mx-auto mt-[50px] mb-[10px] size-[400px] rounded-full bg-transparent bg-[url('@/assets/images/empty-list.jpg')] bg-center bg-no-repeat opacity-50"></div>
      <div className="text-center text-[#555555]">
        <p className="text-[30px] font-bold">No tasks in the list!</p>
      </div>
    </div>
  );
}

export default EmptyPage;

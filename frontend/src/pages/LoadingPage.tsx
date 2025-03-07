function LoadingPage() {
  return (
    <div className="absolute z-99 h-full w-full bg-[#b8b8b86a]">
      <div className="absolute top-[50%] left-[50%] z-99 size-[80px] translate-x-[-50%] translate-y-[-50%] animate-(--animate-spinner) rounded-full border-[8px] border-[#b8b8b8] border-t-[#3882f0]" />
    </div>
  );
}

export default LoadingPage;

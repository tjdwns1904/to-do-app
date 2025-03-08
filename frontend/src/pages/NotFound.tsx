function NotFound() {
  return (
    <div className="absolute top-[50%] left-[50%] size-[700px] translate-x-[-50%] translate-y-[-50%] bg-transparent bg-[url('@/assets/images/404.png')] bg-contain bg-center bg-no-repeat opacity-80">
      <h2 className="relative translate-y-[50%] text-center font-[Nunito] !font-bold opacity-70">
        Sorry... Page not found
      </h2>
    </div>
  );
}

export default NotFound;

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-black text-white">
          EMAN IQBAL
        </h1>
        <div className="mx-auto mt-6 w-[160px] h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-[60%] bg-[#9463c2] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

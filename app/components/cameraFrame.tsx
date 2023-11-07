export function CameraFrame() {
  return (
    <>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-[3px] border-l-[3px]" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-[3px] border-r-[3px]" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-[3px] border-r-[3px]" />
      <div className="absolute top-0 left-0 w-20 h-20 border-t-[3px] border-l-[3px]" />
    </>
  )
}
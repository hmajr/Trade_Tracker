export function LoadingScreen() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-zinc-800 bg-opacity-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
    </div>
  )
}
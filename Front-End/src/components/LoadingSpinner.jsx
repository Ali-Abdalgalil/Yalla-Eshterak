export default function LoadingSpinner({ fullScreen = false }) {
  const wrapper = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white dark:bg-stream-black z-50'
    : 'flex items-center justify-center p-8'

  return (
    <div className={wrapper}>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-stream-red border-t-transparent" />
    </div>
  )
}

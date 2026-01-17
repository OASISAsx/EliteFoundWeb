export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-indigo-600" />
    </div>
  );
}

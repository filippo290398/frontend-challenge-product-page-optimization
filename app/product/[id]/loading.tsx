export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

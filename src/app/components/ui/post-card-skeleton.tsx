export const PostCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse flex flex-col justify-between h-72 w-full">
    {/* Title Section */}
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

    {/* Author & Date Section */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 rounded-full bg-gray-300"></div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-16"></div>
    </div>

    {/* Excerpt Section */}
    <div className="space-y-2">
      <div className="h-3 bg-gray-300 rounded w-full"></div>
      <div className="h-3 bg-gray-300 rounded w-full"></div>
      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
    </div>

    {/* Read more Section */}
    <div className="h-4 bg-gray-300 rounded w-1/4 mt-4"></div>
  </div>
);

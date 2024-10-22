import React from "react";

type Review = {
  user: string;
  productName: string;
  reviewText: string;
  rating: number;
  createdAt: string;
};

type RecentReviewsTableProps = {
  reviews: Review[];
};

const RecentReviewsTable: React.FC<RecentReviewsTableProps> = ({ reviews }) => (
  <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Review</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{review.user}</td>
              <td className="border px-4 py-2">{review.productName}</td>
              <td className="border px-4 py-2">{review.reviewText}</td>
              <td className="border px-4 py-2">{review.rating}</td>
              <td className="border px-4 py-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentReviewsTable;

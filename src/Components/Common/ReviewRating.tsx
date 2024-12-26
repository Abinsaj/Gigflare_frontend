import React, { useState } from 'react'
import { Button, Textarea } from "@nextui-org/react"

interface RatingAndReviewProps {
    onSubmit: (rating: number, review: string) => void
    contracts: any[]
}


const RatingAndReview = ({ onSubmit, contracts }: RatingAndReviewProps) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')

    console.log(rating, review, 'these are the rating and review you gave for this ')
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(rating, review)
        setRating(0)
        setReview('')
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-1 text-yellow-400 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={star <= rating ? 'currentColor' : 'none'}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                />
                            </svg>
                        </button>
                    ))}
                </div>
                <div className='space-y-4 '>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Describe yourself..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 h-32 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-none focus:ring-[#1AA803]"
                    />
                    <div className="flex justify-end">
                        {contracts && contracts.length > 0 ? (
                            <Button
                                type="submit"
                                disabled={rating === 0 || review.trim() === ""}
                                color="primary"
                                className="bg-[#1AA803] rounded-md text-white"
                            >
                                Submit Review
                            </Button>
                        ) : (
                            <p></p>
                        )}

                    </div>
                </div>
            </form>
        </>
    )
}

export default RatingAndReview

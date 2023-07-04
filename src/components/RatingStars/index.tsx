import { ComponentProps, useState } from "react"
import { Container } from "./styles"
import { Star } from "@phosphor-icons/react"

type RatingStarsProps = ComponentProps<typeof Container> & {
  rating: number
  size?: "sm" | "md" | "lg"
  setRating?: (rating: number) => void
}

export const RatingStars = ({ rating, size = "sm", setRating, ...props }: RatingStarsProps) => {
  const [previewRate, setPreviewRate] = useState(0)
  const isEditable = !!setRating
  const ratingValue = isEditable ? previewRate : rating

  const handleMouseEnter = (newRating: number) => {
    if (!isEditable) return
    setPreviewRate(newRating)
  }

  const handleMouseLeave = () => {
    if (!isEditable) return
    setPreviewRate(rating)
  }

  const handleSetValue = () => {
    if (!isEditable) return
    setRating(previewRate)
  }

  return (
    <Container size={size} {...props} css={isEditable ? {cursor: 'pointer'} : undefined}>
     {Array.from({ length: 5 }).map((_, index) => (
       <Star
         key={`star-${index}`}
         weight={(index + 1) <= ratingValue ? "fill" : "regular"}
         onMouseEnter={() => handleMouseEnter(index + 1)}
         onMouseLeave={handleMouseLeave}
         onClick={handleSetValue}
       />
     ))}
    </Container> 
   )
}
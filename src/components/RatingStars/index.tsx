import { ComponentProps } from "react"
import { Container } from "./styles"
import { Star } from "@phosphor-icons/react"
type RatingStarsProps = ComponentProps<typeof Container> & {
  rating: number
  size?: "sm" | "md" | "lg"
  setRating?: (rating: number) => void
}

export const RatingStars = ({ rating, size = "sm", setRating, ...props }: RatingStarsProps) => {
  return (
    <Container size={size} {...props}>
     {Array.from({ length: 5 }).map((_, index) => (
       <Star
         key={`star-${index}`}
         weight={(index + 1) <= rating ? "fill" : "regular"}
       />
     ))}
    </Container> 
   )
}
import { BookCard } from "../BookCard"
import { Link } from "../Link"
import { Text } from "../Typography"
import { Container } from "./styles"

export const PopularBooks = () => {
  return (
    <Container>
      <header>
        <Text size="sm">Livros populares</Text>
        <Link href="/explore" text="Ver todos" />
      </header>

      <section>
        {Array.from({ length: 5 }).map((_, i) => (
          <BookCard key={`popular-${i}`} book={{
            author: "John",
            cover_url: "https://avatars.githubusercontent.com/u/1164541?v=4",
            id: "gafa",
            name: "John",
            summary: "Lorem, ipsum dolor sit amet consectetur ta itaque magni!",
            total_pages: 100,
            created_at: new Date(),
            avgRating: 4
          }} />
        ))}
      </section>
    </Container>
  )
}
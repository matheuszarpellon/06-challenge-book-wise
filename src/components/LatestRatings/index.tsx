import { PageTitle } from "../PageTitle"
import { RatingCard } from "../RatingCard"
import { Text } from "../Typography"
import { Container } from "./styles"
import { ChartLineUp } from "@phosphor-icons/react"

export const LatestRatings = () => {
  return (
    <Container>
      <PageTitle title="Início" icon={<ChartLineUp size={32} />} css={{ marginBottom: 40 }}/>

      <Text size="sm">Avaliações mais recentes</Text>

      <section>
        {Array.from({ length: 5 }).map((_, i) => (
          <RatingCard key={i} rating={{
            id: "aa",
            rate: 4,
            user: {
              name: "John",
              avatar_url: "https://avatars.githubusercontent.com/u/1164541?v=4",
              email: "John@example.com",
              id: "ava",
              created_at: new Date(),
            },
            book: {
              author: "John",
              cover_url: "https://avatars.githubusercontent.com/u/1164541?v=4",
              id: "gafa",
              name: "John",
              summary: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis pariatur distinctio consequuntur numquam magni. Optio praesentium asperiores distinctio quis labore possimus voluptates adipisci nisi quo. Soluta corporis saepe esse amet vel, aspernatur eligendi totam. Iusto eveniet distinctio ipsam laboriosam assumenda laudantium alias voluptates deleniti recusandae, praesentium quo obcaecati in. Ducimus animi corrupti laborum perferendis ipsum aut porro nemo, perspiciatis omnis! Minima saepe pariatur quasi cum possimus id iste corporis dolore, sunt, vitae ducimus quia error officiis sed debitis asperiores ipsum placeat voluptatibus consequuntur illo ipsa quis nobis libero veritatis? Sit odit laborum commodi assumenda reiciendis ex delectus expedita itaque magni!",
              total_pages: 100,
            },
            created_at: new Date(),
          }}/>
        ))}
      </section>
    </Container>
  )
}
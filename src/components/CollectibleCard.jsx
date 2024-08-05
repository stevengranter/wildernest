
import { Card, Image, Text, Title } from '@mantine/core';
function CollectibleCard({ species }) {
  const imagePath = './images/' + species.imgSrc;
  return (
    <Card shadow="sm" p="xl">
      <Card.Section>
        {(species.imgSrc) ? <Image src={imagePath} alt={species.scientificName} /> : ''}

      </Card.Section>

      <Card.Section>
        <Title order={2}></Title>
      </Card.Section>

      <Card.Section>
        <Title order={3}>{species.commonName}</Title>
        <h4>{species.scientificName}</h4>
        <p>{species.description}</p>
        <p>Habitat: {species.habitat}</p>
        <p>Diet: {species.diet}</p>

      </Card.Section>
    </Card>
  );
}
export default CollectibleCard;
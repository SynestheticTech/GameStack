import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import _ from "lodash";
import { Game } from "../hooks/useGames";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
        <PlatformIconList
          platforms={_.map(game.parent_platforms, (parent) => parent.platform)}
        />
      </CardBody>
    </Card>
  );
};

export default GameCard;

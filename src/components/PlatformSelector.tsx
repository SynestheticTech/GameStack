import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../hooks/usePlatforms";
import _ from "lodash";
import { Platform } from "../hooks/useGames";

interface Props {
  selectedPlatform: Platform | null;
  onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector = ({ selectedPlatform, onSelectPlatform }: Props) => {
  const { data, isLoading, error } = usePlatforms();

  if (error || isLoading) return null;
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        data-cy="platform-selector"
      >
        {selectedPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList>
        {_.map(data, (platform) => (
          <MenuItem
            key={platform.id}
            data-cy={platform.name}
            onClick={() => onSelectPlatform(platform)}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;

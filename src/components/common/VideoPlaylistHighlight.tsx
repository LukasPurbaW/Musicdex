import {
  AspectRatio,
  Box,
  Flex,
  Image,
  List,
  ListIcon,
  Text,
  ListItem,
  HStack,
  Center,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { useStoreActions, useStoreState } from "../../store";
import { useDraggableSong } from "../data/DraggableSong";
import { NowPlayingIcon } from "./NowPlayingIcon";

export const VideoPlaylistHighlight = React.memo(
  ({ video, playlist }: { video: any; playlist?: PlaylistFull }) => {
    const setPlaylist = useStoreActions(
      (actions) => actions.playback.setPlaylist
    );
    const currentlyPlayingId = useStoreState(
      (state) => state.playback.currentlyPlaying.song?.id
    );

    return (
      <Box width="100%" height="100%">
        <AspectRatio
          ratio={34 / 9}
          maxH="auto"
          borderRadius="lg"
          borderColor="brand.100"
          borderWidth="2px"
          borderStyle="solid"
          overflow="hidden"
          boxSizing="border-box"
        >
          <Flex>
            <AspectRatio
              ratio={16 / 9}
              flex={"0 1"}
              flexBasis={1600 / 34 + "%"}
              width={1600 / 34 + "%"}
            >
              <Image
                src={`https://i.ytimg.com/vi/${video.id}/sddefault.jpg`}
                borderRadius="md"
              />
            </AspectRatio>
            <Box flex={"1 1"} flexBasis={900 / 34 + "%"} height="100%">
              {playlist?.content ? (
                <List
                  spacing={1}
                  py={2}
                  height="100%"
                  overflowY="auto"
                  scrollSnapType="block"
                  scrollSnapStop="always"
                  display="block"
                  flexDir="column"
                >
                  {playlist?.content.map((x, idx) => (
                    <HighlightListItem
                      key={"wph" + x.id}
                      song={x}
                      index={idx}
                      active={currentlyPlayingId === x.id}
                      songClicked={() => {
                        if (!playlist) return;
                        setPlaylist({ playlist, startPos: idx });
                      }}
                    />
                  ))}
                </List>
              ) : (
                <Center height="100%">
                  {new Date(video.available_at) < new Date() ? (
                    <Box>
                      <Text>Stream is not yet tagged with any songs.</Text>
                      <Button variant="link" colorScheme={"n2"}>
                        Help us tag it on Holodex
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <Text>Going Live (distance)</Text>
                      <Button variant="link" colorScheme={"n2"}>
                        Watch on Holodex
                      </Button>{" "}
                      <Button variant="link" colorScheme={"n2"}>
                        (Youtube)
                      </Button>
                    </Box>
                  )}
                </Center>
              )}
            </Box>
          </Flex>
        </AspectRatio>
        <Text mt={1}>{video.title}</Text>
        <Text opacity={0.75} fontSize="sm">
          {video.channel.name}
        </Text>
      </Box>
    );
  }
);

const HighlightListItem = React.memo(
  ({
    song,
    songClicked,
    index = 0,
    active,
  }: {
    song: Song;
    songClicked: () => void;
    index: number;
    active: boolean;
  }) => {
    const dragProps = useDraggableSong(song);
    const [hover, setHover] = useState(false);
    function LeftIcon() {
      if (active)
        return (
          <NowPlayingIcon style={{ color: "var(--chakra-colors-n2-400)" }} />
        );
      if (hover) return <ListIcon as={IoMdPlay} width="20px" mr={0} />;
      return <Text width="20px">{index + 1}.</Text>;
    }
    return (
      <ListItem
        key={song.id + "highlightsong"}
        scrollSnapAlign="start"
        _hover={{ bgColor: "whiteAlpha.200" }}
        bgColor={active ? "whiteAlpha.200" : ""}
        transition="0.3s"
        pl={2}
        onClick={songClicked}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        {...dragProps}
      >
        <HStack>
          <LeftIcon />
          <Box>
            <Text noOfLines={0}>{song.name}</Text>
            <Text noOfLines={0} color="gray.500" fontSize="sm">
              {/* {song.channel.name} */} ({song.original_artist})
            </Text>
          </Box>
        </HStack>
      </ListItem>
    );
  }
);
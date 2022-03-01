import { Button } from "@chakra-ui/button";
import { Heading, HStack } from "@chakra-ui/layout";
import { Divider, IconButton, Text } from "@chakra-ui/react";
import React, { Suspense, useMemo } from "react";
import { FiTrash, FiLink2 } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import {
  QueueContextMenu,
  QUEUE_MENU_ID,
} from "../components/common/QueueContext";
import { SongTable } from "../components/data/SongTable";
import { ContainerInlay } from "../components/layout/ContainerInlay";
import { PageContainer } from "../components/layout/PageContainer";
import { useFormatPlaylist } from "../modules/playlist/useFormatPlaylist";
import { useStoreActions, useStoreState } from "../store";

export const Queue = React.memo(() => {
  const expanded = useStoreState((state) => state.player.showUpcomingOverlay);
  const setExpanded = useStoreActions(
    (actions) => actions.player.setShowUpcomingOverlay
  );

  const playlistQueue = useStoreState((state) => state.playback.playlistQueue);
  const playedPlaylistQueue = useStoreState(
    (state) => state.playback.playedPlaylistQueue
  );

  const currentlyPlaying = useStoreState(
    (state) => state.playback.currentlyPlaying
  );

  const currentPlaylist = useStoreState((s) => s.playback.currentPlaylist);

  const playlistTotalQueue = useMemo(() => {
    return [...playlistQueue, ...playedPlaylistQueue];
  }, [playedPlaylistQueue, playlistQueue]);

  const location = useLocation();

  React.useEffect(() => {
    // runs on location, i.e. route, change
    setExpanded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const queue = useStoreState((state) => state.playback.queue);

  const clearAll = useStoreActions((actions) => actions.playback.clearAll);
  const clearQueue = useStoreActions((actions) => actions.playback._queueClear);

  const clearPlaylist = useStoreActions(
    (actions) => actions.playback.clearPlaylist
  );

  const next = useStoreActions((actions) => actions.playback.next);
  const formatPlaylist = useFormatPlaylist();
  const { currentTitle, urlLinkToPlaylist } = useMemo(
    () => ({
      currentTitle: currentPlaylist && formatPlaylist("title", currentPlaylist),
      urlLinkToPlaylist:
        currentPlaylist && formatPlaylist("link", currentPlaylist),
    }),
    [currentPlaylist, formatPlaylist]
  );

  return (
    <PageContainer>
      <div className="bgOver"></div>
      <QueueContextMenu />
      <ContainerInlay>
        <HStack alignItems={"center"}>
          <Button
            marginRight="auto"
            marginLeft="auto"
            leftIcon={<FiTrash />}
            colorScheme="red"
            onClick={() => {
              clearAll();
              setExpanded(false);
            }}
          >
            Clear All
          </Button>
        </HStack>
        {queue.length > 0 && (
          <React.Fragment>
            <Heading mt={4}>
              Queue:
              <IconButton
                aria-label="clear playlist"
                icon={<FiTrash />}
                colorScheme="red"
                variant="ghost"
                onClick={() => clearQueue()}
                float="right"
              ></IconButton>
            </Heading>
            <Suspense fallback={<div>Loading...</div>}>
              <SongTable
                songs={queue}
                menuId={QUEUE_MENU_ID}
                rowProps={{
                  songClicked: (e, s) =>
                    next({ count: (s as any).idx - 1, userSkipped: true }),
                }}
                limit={10}
              />
            </Suspense>
            <Divider />
          </React.Fragment>
        )}
        {currentlyPlaying && (
          <React.Fragment>
            <Heading mt={4}>
              Playlist:
              <IconButton
                aria-label="clear playlist"
                icon={<FiTrash />}
                colorScheme="red"
                variant="ghost"
                onClick={() => clearPlaylist()}
                float="right"
              ></IconButton>
            </Heading>
            <Text
              fontSize="md"
              as={Link}
              to={urlLinkToPlaylist || "#"}
              onClick={() => setExpanded(false)}
              _hover={{ textDecoration: "underline" }}
            >
              {currentTitle}
              <IconButton
                variant="ghost"
                size="xs"
                aria-label="go to playlist"
                icon={<FiLink2 />}
                ml={1}
              ></IconButton>
            </Text>
            <Suspense fallback={<div>Loading...</div>}>
              <SongTable
                songs={playlistTotalQueue}
                rowProps={{
                  songClicked: (e, s) =>
                    next({ count: (s as any).idx - 1, userSkipped: true }),
                }}
                limit={10}
              />
            </Suspense>
          </React.Fragment>
        )}
      </ContainerInlay>
    </PageContainer>
  );
});

// const OverlayWrapper = styled.div<{ visible: boolean }>`
//   width: 100vw;
//   height: 100vh;
//   overflow-x: hidden;
//   overflow-y: ${({ visible }) => (visible ? "scroll" : "hidden")};
//   position: fixed;
//   top: 0;
//   visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
//   z-index: 5;

//   .overlay {
//     position: relative;
//     top: ${({ visible }) => (visible ? "64px" : "100vh")};
//     visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
//     transition: top 0.4s ease, opacity 0.5s ease;
//     width: 100%;
//     clip-path: inset(0 0 0 0);
//   }
//   .bgOver {
//     top: ${({ visible }) => (visible ? "64px" : "100vh")};
//     visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
//     height: calc(100% - 64px - 80px);
//     transition: top 0.4s ease, opacity 0.5s ease;

//     background: black;
//     position: fixed;
//     width: 100%;
//   }
// `;

import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { FiPlay } from "react-icons/fi";
import { PlaylistMoreControlsMenu } from "./PlaylistMoreControls";

type ClickEventHandler = React.MouseEventHandler<HTMLButtonElement>;

export function PlaylistButtonArray({
  onPlayClick,
  onAddQueueClick,
  onEditClick,
  onFinishEditClick,
  editMode,
  canEdit,
}: {
  onPlayClick: ClickEventHandler;
  onAddQueueClick: ClickEventHandler;
  onEditClick?: ClickEventHandler;
  onFinishEditClick?: ClickEventHandler;
  editMode: boolean;
  canEdit: boolean;
}): JSX.Element {
  return (
    <HStack spacing={4}>
      <Button
        aria-label="play"
        leftIcon={<FiPlay />}
        size="md"
        colorScheme="n2"
        onClick={onPlayClick}
      >
        Play
      </Button>
      <Button
        variant="ghost"
        aria-label="add to queue"
        size="md"
        colorScheme="n2"
        onClick={onAddQueueClick}
      >
        Add to Queue
      </Button>
      <Button
        display={!editMode && canEdit ? "block" : "none"}
        variant="ghost"
        aria-label="edit"
        size="md"
        colorScheme="n2"
        onClick={(e) => {
          onEditClick && onEditClick(e);
        }}
      >
        Edit
      </Button>
      <Button
        display={editMode && canEdit ? "block" : "none"}
        variant="ghost"
        aria-label="edit"
        size="md"
        colorScheme="green"
        onClick={(e) => {
          onFinishEditClick && onFinishEditClick(e);
        }}
      >
        Done Editing
      </Button>
      <PlaylistMoreControlsMenu></PlaylistMoreControlsMenu>
    </HStack>
  );
}
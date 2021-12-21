import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react";

export const SongTable = (
  songs: Song[],
  colorScheme: string | (string & {}) | undefined
) => {
  return (
    <Table variant="simple" colorScheme={colorScheme}>
      <Thead>
        <Tr>
          <Th isNumeric>#</Th>
          <Th>Title</Th>
          <Th>Covered By</Th>
          <Th>Original Artist</Th>
          <Th isNumeric>Duration</Th>
          <Th isNumeric>Sang On</Th>
          <Th> &gt; </Th>
        </Tr>
      </Thead>
      <Tbody>{songs.map((s, i) => SongTableItem(s, i))}</Tbody>
      <Tfoot>
        <Tr>
          <Th>#</Th>
          <Th>Title</Th>
          <Th>Covered By</Th>
          <Th>Original Artist</Th>
          <Th isNumeric>Duration</Th>
          <Th isNumeric>Sang On</Th>
          <Th> &gt; </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export const SongTableItem = (song: Song, idx: number) => {
  return (
    <Tr>
      <Td isNumeric>{idx}</Td>
      <Td>{song.name}</Td>
      <Td>{song.channel.name}</Td>
      <Td>{song.original_artist}</Td>
      <Td isNumeric>{song.end - song.start}</Td>
      <Td isNumeric>{song.available_at}</Td>
      <Td> X Y Z </Td>
    </Tr>
  );
};
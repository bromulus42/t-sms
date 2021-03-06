import React, { useEffect, useState, FC } from "react";
import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import { Table, TBody, THead, Tr, Th, Td } from "@twilio-paste/table";
import { Button } from "@twilio-paste/button";
import { ShowIcon } from "@twilio-paste/icons/cjs/ShowIcon";
import { Input } from "@twilio-paste/input";
import { Label } from "@twilio-paste/label";
import { Card } from "@twilio-paste/card";
import { Spinner } from "@twilio-paste/spinner";
import { UnorderedList, ListItem } from "@twilio-paste/list";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@twilio-paste/modal";

// Paste Design System Component Library Docs: https://paste.twilio.design/
// Example Usage CodeSandbox: https://codesandbox.io/s/dxx6q

// Part 1 Fetching data and rendering a message history table
// Figma Prototype Link: https://www.figma.com/proto/kVIVypbmlqZnqRnaAFoSJw/EIC-Frontend-Onsite-Interview-Designs?node-id=2%3A2&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2%3A2&show-proto-sidebar=1

// Part 2 Client-side filtering based on message body
// Figma Prototype Link: https://www.figma.com/proto/kVIVypbmlqZnqRnaAFoSJw/EIC-Frontend-Onsite-Interview-Designs?node-id=3%3A4&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=3%3A4&show-proto-sidebar=1

// Part 3 Fetching message row details in modal
// Figma Prototype Link: https://www.figma.com/proto/kVIVypbmlqZnqRnaAFoSJw/EIC-Frontend-Onsite-Interview-Designs?node-id=2%3A3&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2%3A3&show-proto-sidebar=1

// Part 4 Deleting a message from the history
// Figma Prototype Link: https://www.figma.com/proto/kVIVypbmlqZnqRnaAFoSJw/EIC-Frontend-Onsite-Interview-Designs?node-id=3%3A5&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=3%3A5&show-proto-sidebar=1

// IMPORTANT:
// SEE src/mocks/handlers.js for the mock API endpoints to hit to fetch/modify the messages data

export const MessageHistory = () => {
  // useEffect React Docs may be useful here: https://reactjs.org/docs/hooks-effect.html
  // Fetch API Docs may be useful here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  // const  [test, setTest] = useState()

  const [error, setError] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("https://mockapi.twilio.com/messages")
      .then((res) => res.json())
      .then(
        ({ messages }) => setMessages(messages),
        (error) => setError(true)
      )
      .finally(() => setIsLoaded(true));
  }, []);

  const Loading = () => {
    return <Spinner decorative={false} title="Loading" />;
  };

  const Error = () => {
    return (
      <div>
        <p>Oops, something went wrong</p>
        <Button variant="secondary" onClick={() => {}}>
          Refresh Page
        </Button>
      </div>
    );
  };

  const MessagesTable = () => {
    return (
      <Table>
        <THead>
          <Tr>
            <Th>SID</Th>
            <Th>To/From</Th>
            <Th>Body</Th>
            <Th>Status</Th>
          </Tr>
        </THead>
        {messages.map((message) => (
          <Tr>
            <Td>
              <Text as="p">{message.sid}</Text>
            </Td>
            <Td>
              <Text as="p">{message.to}</Text>
              <Text as="p">{message.from}</Text>
            </Td>
            <Td>
              <Text as="p">{message.body}</Text>
            </Td>
            <Td>
              <Text as="p">{message.status}</Text>
            </Td>
          </Tr>
        ))}
      </Table>
    );
  };

  const View = () => {
    if (error) {
      return <Error />;
    } else if (!loaded) {
      return <Loading />;
    } else if (!!messages.length) {
      console.log("messages");
      return <MessagesTable />;
    }
  };

  return (
    <Box marginTop="space60">
      {" "}
      <View />
    </Box>
  );
};

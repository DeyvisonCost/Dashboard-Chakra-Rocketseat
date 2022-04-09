import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Deyvison Costa</Text>
          <Text color="gray.300" fontSize="small">
            deyvisongtr@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Deyvison Costa" src="https://github.com/DeyvisonCost.png" />
    </Flex>
  );
}
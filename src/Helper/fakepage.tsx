import { useState } from 'react';
import {
  Box,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function FakePage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm !== '' && !selectedTopics.includes(searchTerm)) {
        setSelectedTopics([...selectedTopics, searchTerm]);
        setSearchTerm('');
      }
    }
  };

  const handleBadgeClose = (index: number) => {
    const newSelectedTopics = [...selectedTopics];
    newSelectedTopics.splice(index, 1);
    setSelectedTopics(newSelectedTopics);
  };

  return (
    <Box maxW="md" mx="auto">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<IconButton aria-label="Close" icon={<CloseIcon />} />}
        />
        <Input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search topics"
        />
      </InputGroup>
      <Box mt="2">
        {selectedTopics.map((topic, index) => (
          <Badge key={index} colorScheme="blue" mr="2" mb="2">
            {topic}
                <IconButton
                    aria-label={`Close ${topic}`}
              size="xs"
              ml="1"
              icon={<CloseIcon />}
              onClick={() => handleBadgeClose(index)}
            />
          </Badge>
        ))}
      </Box>
    </Box>
  );
}

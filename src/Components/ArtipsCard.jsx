import { Stack, Image, Tag, Text, Heading, Box } from "@chakra-ui/react";
import { BsDot, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ArtipsCard = ({
  id,
  imageSrc,
  tag,
  readTime,
  title,
  author,
  date,
  isSaved,
  onBookmarkToggle,
}) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const savedArticles =
  //     JSON.parse(localStorage.getItem("savedArticles")) || [];
  //   if (savedArticles.includes(id)) {
  //     setIsSaved(true);
  //   }
  // }, [id]);

  const handleCardClick = () => {
    navigate(`/artikel/${id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onBookmarkToggle(id);
  };

  return (
    <Stack
      bgColor={"white"}
      borderRadius={"2xl"}
      direction={"row"}
      p={3}
      pr={4}
      shadow={"sm"}
      gap={3}
      mb={2}
      flex={1}
      onClick={handleCardClick}
      cursor={"pointer"}
    >
      <Image
        src={imageSrc}
        w={"6rem"}
        objectFit={"cover"}
        borderRadius={"xl"}
      />
      <Stack direction={"column"} flex={1}>
        <Stack direction={"row"} align={"center"} gap={0}>
          <Tag
            bgColor={"#2C3631"}
            h={15}
            color={"white"}
            rounded={"full"}
            fontSize={"0.6rem"}
          >
            {tag}
          </Tag>
          <BsDot color={"#2C3631"} size={26} />
          <Text color={"#2C3631"} fontSize={"0.7rem"}>
            {readTime}
          </Text>
        </Stack>
        <Heading color={"#2C3631"} size={"sm"} flex={1}>
          {title}
        </Heading>
        <Stack
          direction={"row"}
          color={"#909090"}
          align={"center"}
          gap={0}
          justify={"space-between"}
        >
          <Stack gap={0} direction={"row"} align={"center"}>
            <Text fontSize={"0.65rem"}>{author}</Text>
            <BsDot size={22} color={"#909090"} />
            <Text fontSize={"0.65rem"}>{date}</Text>
          </Stack>
          <Box
            _hover={{ transform: "scale(1.1)" }}
            transition={"transform 0.3s ease"}
            onClick={handleBookmarkClick}
          >
            {isSaved ? (
              <BsBookmarkFill color={"#2C3631"} size={16} cursor={"pointer"} />
            ) : (
              <BsBookmark color={"#2C3631"} size={16} cursor={"pointer"} />
            )}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ArtipsCard;

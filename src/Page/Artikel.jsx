import React, { useState, useEffect } from "react";
import {
  Stack,
  Heading,
  Box,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import ArtipsCard from "../Components/ArtipsCard";
import NewArticlesCard from "../Components/NewArticlesCard";
import ArticleData from "../Components/data/ArticleData";

const Artikel = () => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);

  // Load saved articles from localStorage on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(saved);
  }, []);

  // Handle bookmark toggle for both cards
  const handleBookmarkToggle = (id) => {
    let updatedSavedArticles = [...savedArticles];

    if (updatedSavedArticles.includes(id)) {
      updatedSavedArticles = updatedSavedArticles.filter(
        (articleId) => articleId !== id
      );
    } else {
      updatedSavedArticles.push(id);
    }

    setSavedArticles(updatedSavedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));
  };

  return (
    <Stack pt={"6vh"} padding={"1.5rem"}>
      {/* Search Bar */}
      <Stack
        direction={"row"}
        align={"center"}
        position={"sticky"}
        top={0}
        zIndex={999}
        justify={"space-between"}
        flex={1}
        bgColor={"#f5f5f5"}
        py={5}
        backdropFilter={"blur(50px)"}
        ml={"-1.5rem"}
        mr={"-1.5rem"}
      >
        {isViewAll && (
          <Box
            bgColor={"#2C3631"}
            borderRadius={"full"}
            p={1}
            cursor={"pointer"}
            onClick={() => setIsViewAll(!isViewAll)}
          >
            <IoIosArrowBack color="white" size={25} />
          </Box>
        )}
        {/* Search Bar */}
        <InputGroup
          borderRadius={5}
          size="md"
          w={"full"}
          mx={6}
          color="#2C3631"
        >
          <InputLeftElement
            pointerEvents="none"
            children={<RiSearchLine color="#2C3631" size={20} />}
          />
          <Input
            borderRadius={"full"}
            type="text"
            placeholder="Cari artikel/tips & trik lainnya..."
            shadow={"md"}
            w={"full"}
            color={"#2C3631"}
            fontWeight={"bold"}
            _active={{
              borderColor: "#2C3631",
            }}
            _focus={{
              borderColor: "#2C3631",
            }}
          />
        </InputGroup>
      </Stack>

      {/* Tab View */}
      {isViewAll && (
        <Stack pb={"2vh"}>
          <Tabs variant="unstyled" borderRadius={"full"} p={0}>
            <TabList borderRadius={"full"} h={"2rem"} gap={3} p={0}>
              <Tab
                borderRadius={"full"}
                border={"1px solid #2C3631"}
                _selected={{
                  color: "white",
                  bg: "#2C3631",
                }}
              >
                Semua
              </Tab>
              <Tab
                borderRadius={"full"}
                border={"1px solid #2C3631"}
                _selected={{
                  color: "white",
                  bg: "#2C3631",
                }}
              >
                Tips & Trik
              </Tab>
              <Tab
                borderRadius={"full"}
                border={"1px solid #2C3631"}
                _selected={{
                  color: "white",
                  bg: "#2C3631",
                }}
              >
                Artikel
              </Tab>
            </TabList>
            <TabPanels pt={5}>
              <TabPanel p={0}>
                {ArticleData.map((article, index) => (
                  <ArtipsCard
                    key={index}
                    id={article.id}
                    imageSrc={article.imageSrc}
                    tag={article.tag}
                    readTime={article.readTime}
                    title={article.title}
                    author={article.author}
                    date={article.date}
                    isSaved={savedArticles.includes(article.id)}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                ))}
              </TabPanel>
              <TabPanel p={0}>
                {ArticleData.filter(
                  (article) => article.tag === "Tips & Trik"
                ).map((article, index) => (
                  <ArtipsCard
                    key={index}
                    id={article.id}
                    imageSrc={article.imageSrc}
                    tag={article.tag}
                    readTime={article.readTime}
                    title={article.title}
                    author={article.author}
                    date={article.date}
                    isSaved={savedArticles.includes(article.id)}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                ))}
              </TabPanel>
              <TabPanel p={0}>
                {ArticleData.filter((article) => article.tag === "Artikel").map(
                  (article, index) => (
                    <ArtipsCard
                      key={index}
                      id={article.id}
                      imageSrc={article.imageSrc}
                      tag={article.tag}
                      readTime={article.readTime}
                      title={article.title}
                      author={article.author}
                      date={article.date}
                      isSaved={savedArticles.includes(article.id)}
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  )
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      )}

      {/* Artikel Terbaru */}
      {!isViewAll && (
        <>
          <Stack>
            <Heading color={"#2C3631"} size={"md"}>
              Terbaru
            </Heading>
            <Stack
              mt={3}
              direction={"row"}
              flex={1}
              overflowX={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {ArticleData.map((article, index) => (
                <NewArticlesCard
                  key={index}
                  id={article.id}
                  imageSrc={article.imageSrc}
                  tag={article.tag}
                  readTime={article.readTime}
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  isSaved={savedArticles.includes(article.id)}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))}
            </Stack>
          </Stack>
          <Stack mt={6}>
            <Stack
              justify={"space-between"}
              direction={"row"}
              align={"center"}
              my={3}
            >
              <Heading color={"#2C3631"} size={"md"}>
                Untuk Anda
              </Heading>
              <Button
                borderRadius={"full"}
                color={"#2C3631"}
                fontSize={"0.75rem"}
                shadow={"sm"}
                variant={"ghost"}
                h={"2rem"}
                onClick={() => setIsViewAll(!isViewAll)}
              >
                Lihat Semua
              </Button>
            </Stack>
            <Stack pb={"4vh"} gap={0}>
              {ArticleData.map((article, index) => (
                <ArtipsCard
                  key={index}
                  id={article.id}
                  imageSrc={article.imageSrc}
                  tag={article.tag}
                  readTime={article.readTime}
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  isSaved={savedArticles.includes(article.id)}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))}
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Artikel;

import React, { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";
import ArticleData from "../Components/data/ArticleData";
import ArtipsCard from "../Components/ArtipsCard";
import { BsBookmarkFill } from "react-icons/bs";
import {
  Box,  
  TabPanels,
  TabPanel,  
  Stack,  
  Heading,
  Flex,
  Tab,
  Tabs,
  TabList,
} from "@chakra-ui/react";

const ArticleList = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(saved);
  }, []);

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
    <Stack pt={"6vh"} padding={"1.5rem"} pb={"4rem"}>
      <Flex justifyContent="center" alignItems="center" mb="6" position="relative">
        <Box position="absolute" left={0}>
          <BackButton/>
        </Box>
        <Heading size="md">Edit Bacaan</Heading>
      </Flex>
      <Stack pb={"2vh"}>
        <Tabs variant="unstyled" borderRadius={"full"} p={0}>
          <TabList borderRadius={"full"} h={"2rem"} gap={2} p={0}>
            <Tab
              borderRadius={"full"}
              border={"1px solid #2C3631"}
              _selected={{
                color: "white",
                bg: "#2C3631",
              }}
              fontSize={"0.75rem"}
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
              fontSize={"0.75rem"}
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
              fontSize={"0.75rem"}
            >
              Artikel
            </Tab>
            <Tab
              borderRadius={"full"}
              border={"1px solid #2C3631"}
              _selected={{
                color: "white",
                bg: "#2C3631",
              }}
              fontSize={"0.75rem"}
            >
              Disimpan
            </Tab>
          </TabList>
          <TabPanels pt={5}>
            <TabPanel p={0}>
              {ArticleData.map((article, index) => (
                <ArtipsCard
                  id={article.id}
                  imageSrc={article.imageSrc}
                  tag={article.tag}
                  readTime={article.readTime}
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  isSaved={savedArticles.includes(article.id)}
                  onBookmarkToggle={handleBookmarkToggle}
                  basePath="/cms/article/edit"
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
                  basePath="/cms/article/edit"
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
                    basePath="/cms/article/edit"
                  />
                )
              )}
            </TabPanel>
            <TabPanel p={0}>
              {/* check if no articles are being saved */}
              {savedArticles.length !== 0 ? (
                <>
                  {ArticleData.filter((article) =>
                    savedArticles.includes(article.id)
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
                      basePath="/cms/article/edit"
                    />
                  ))}
                </>
              ) : (
                <Stack direction="row" align={"center"}>
                  <Heading size={"sm"} direction="row" fontWeight={"400"}>
                    Belum ada artikel yang disimpan
                  </Heading>
                  <BsBookmarkFill color={"#2C3631"} size={16} />
                </Stack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
};

export default ArticleList;

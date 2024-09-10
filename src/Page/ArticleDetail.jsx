import React from "react";
import { useParams } from "react-router-dom";
import { Heading, Stack, Text } from "@chakra-ui/react";

const ArticleData = [
  {
    id: 1,
    imageSrc: "/assets/lalat buah.png",
    tag: "Tips & Trik",
    readTime: "1.5 menit membaca",
    title: "Lalat Buah: Cara pencegahan dan pembasmian",
    author: "Universitas Gadjah Mada",
    date: "7 Mei 2024",
  },
  {
    id: 2,
    imageSrc: "/assets/kutu putih.png",
    tag: "Artikel",
    readTime: "2 menit membaca",
    title: "Kutu Putih dan Pengelolaannya",
    author: "Universitas Gadjah Mada",
    date: "1 Juni 2024",
  },
  {
    id: 3,
    imageSrc: "/assets/kumbang.png",
    tag: "Artikel",
    readTime: "3 menit membaca",
    title: "Pengelolaan Penggerek Titik Tumbuh Salak",
    author: "Universitas Gadjah Mada",
    date: "15 April 2024",
  },
  {
    id: 4,
    imageSrc: "/assets/tikus.png",
    tag: "Tips & Trik",
    readTime: "3 menit membaca",
    title: "Tikus Pohon dan Pengelolaannya",
    author: "Universitas Gadjah Mada",
    date: "6 Mei 2024",
  },
  {
    id: 5,
    imageSrc: "/assets/bajing.png",
    tag: "Artikel",
    readTime: "3 menit membaca",
    title: "Bajing dan Pengelolaannya",
    author: "Universitas Gadjah Mada",
    date: "17 April 2024",
  },
];

const ArticleDetail = () => {
  const { id } = useParams(); // Extract the id from the URL

  // Find the article based on the id
  const article = ArticleData.find((article) => article.id === parseInt(id));

  return (
    <Stack>
      <Heading>{article.title}</Heading>
      <Text>{article.author}</Text>
      <Text>{article.date}</Text>
      {/* Add more article details here */}
    </Stack>
  );
};

export default ArticleDetail;

import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import Album from "../components/Album/Album";
import styles from "../styles/Home.module.css";
import { Album as IAlbum, getNewReleases, NewReleases } from "./api/spotify";

export const getStaticProps: GetStaticProps = async () => {
  const newReleases = await getNewReleases();
  return {
    props: { newReleases },
  };
};

export default function Home({ newReleases }: { newReleases: NewReleases }) {
  const albums: IAlbum[] = [];
  const singles: IAlbum[] = [];

  newReleases.albums.items.forEach((item) => {
    switch (item.album_type) {
      case "album":
        albums.push(item);
        break;
      case "single":
        singles.push(item);
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Next + Spotify API</title>
        <meta
          name='description'
          content='Side project to learn next and spotify API'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins'
          rel='stylesheet'
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span>spotify</span>
          <span>new releases</span>
        </h1>
        <section className={styles.releases}>
          <div className={styles.images}>
            {albums.map((album) => (
              <Album album={album} />
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>
          Project by{" "}
          <a href='https://jesspagan.com' target='_blank' rel='noreferrer'>
            Jessica Pagan
          </a>{" "}
          using{" "}
          <a href='https://nextjs.org' target='_blank' rel='noreferrer'>
            Next.js
          </a>{" "}
          and{" "}
          <a
            href='https://developer.spotify.com/'
            target='_blank'
            rel='noreferrer'
          >
            Spotify for Developers
          </a>
        </p>
      </footer>
    </div>
  );
}

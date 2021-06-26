import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getNewReleases, NewReleases } from "./api/spotify";

export const getStaticProps: GetStaticProps = async () => {
  const newReleases = await getNewReleases();
  return {
    props: { newReleases },
  };
};

export default function Home({ newReleases }: { newReleases: NewReleases }) {
  const releases = newReleases.albums.items;
  console.log(releases);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next + Spotify API</title>
        <meta
          name='description'
          content='Side project to learn next and spotify API'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href='https://nextjs.org'>Next.js</a> +{" "}
          <a href='https://developer.spotify.com/'>Spotify</a>
        </h1>
        <div className={styles.images}>
          {releases.map((release) => (
            <div className={styles.release} key={release.id}>
              <div className={styles.image_container}>
                <Image
                  className={styles.image}
                  alt={`${release.name} cover photo`}
                  src={release.images[1].url}
                  width={160}
                  height={160}
                />
              </div>
              <span>{release.name}</span>
              <span>{release.album_type}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

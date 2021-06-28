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
          href='https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC'
          rel='stylesheet'
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span>spotify</span>
          <span>new releases</span>
        </h1>
        <div className={styles.images}>
          {releases.map((release) => (
            <div className={styles.release} key={release.id}>
              <a href={release.external_urls.spotify} target='_blank'>
                <div className={styles.image_container}>
                  <Image
                    className={styles.image}
                    alt={`${release.name} cover photo`}
                    src={release.images[1].url}
                    width={160}
                    height={160}
                  />
                </div>
              </a>
              <span className={styles.release_title}>
                {release.name.toLowerCase()}
              </span>
              <span className={styles.release_type}>
                {release.album_type.toLowerCase()}
              </span>
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>
          Project by{" "}
          <a href='https://jesspagan.com' target='_blank'>
            Jess Pagan
          </a>{" "}
          using{" "}
          <a href='https://nextjs.org' target='_blank'>
            Next.js
          </a>{" "}
          and{" "}
          <a href='https://developer.spotify.com/' target='_blank'>
            Spotify for Developers
          </a>
        </p>
      </footer>
    </div>
  );
}

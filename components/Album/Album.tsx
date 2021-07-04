import Image from "next/image";
import { Album as IAlbum } from "../../pages/api/spotify";
import { capitalize } from "../../utils/formatters";
import styles from "./Album.module.css";

export default function Album({ album }: { album: IAlbum }) {
  return (
    <div className={styles.release} key={album.id}>
      <a href={album.external_urls.spotify} target='_blank' rel='noreferrer'>
        <div className={styles.image_container}>
          <Image
            className={styles.image}
            alt={`${album.name} cover photo`}
            src={album.images[1].url}
            width={140}
            height={140}
          />
        </div>
      </a>
      <span className={styles.release_title}>{album.name}</span>
      <span className={styles.release_type}>
        {capitalize(album.album_type)}
      </span>
    </div>
  );
}

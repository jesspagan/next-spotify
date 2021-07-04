import Image from "next/image";
import { Album } from "../../pages/api/spotify";
import { capitalize, getYear } from "../../utils/formatters";
import styles from "./Single.module.css";

export default function Single({ single }: { single: Album }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        alt={`${single.name} cover photo`}
        src={single.images[1].url}
        width={80}
        height={80}
      />
      <div className={styles.info}>
        <span className={styles.title}>{single.name}</span>
        <span className={styles.date_type}>
          {`${getYear(single.release_date)} • ${capitalize(single.album_type)}`}
        </span>
      </div>
      <span className={styles.decor}>••</span>
    </div>
  );
}

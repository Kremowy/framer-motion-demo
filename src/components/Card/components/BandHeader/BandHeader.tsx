import { MotionValue, motion, AnimatePresence } from "framer-motion";
import styles from "./BandHeader.module.scss";
import TAlbum from "../../../../types/album";

interface props {
  album: null | undefined | TAlbum;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  title: string;
  subtitle: string;
  image: string;
  handleMenu: () => void;
}

const BandHeader = ({
  album,
  x,
  y,
  rotateX,
  rotateY,
  title,
  subtitle,
  image,
  handleMenu,
}: props) => {
  const backgroundColor = album
    ? `linear-gradient(${album.colors.primary}, ${album.colors.secondary})`
    : `linear-gradient(#8e2a29, #6f2929)`;

  const arrowColor = album ? album.colors.secondary : "#6f2929";

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: backgroundColor }}
    >
      <div className={styles.arrow} style={{ borderTopColor: arrowColor }} />

      <AnimatePresence>
        {!album && (
          <motion.img
            key="band"
            className={styles.image}
            style={{ x, y, rotateX, rotateY, z: 10000 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            draggable={false}
            src={image}
            alt="band pic"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {album && (
          <motion.img
            key="album"
            className={styles.image}
            style={{ x, y, rotateX, rotateY, z: 10000 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            draggable={false}
            src={album.image}
            alt="album pic"
          />
        )}
      </AnimatePresence>

      <div className={styles.hiddenOverflow}>
        <AnimatePresence>
          {!album && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween" }}
              className={styles.bandName}
            >
              <h1>{title}</h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {album && (
            <motion.div
              className={styles.bandName}
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween" }}
            >
              <AnimatePresence>
                <h1>{album.name}</h1>

                <div className={styles.albumInfo}>
                  <h2 onClick={handleMenu}>{album.band}</h2>
                  <p>
                    Released {album.release_date}, {album.release_year}
                  </p>
                </div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BandHeader;
import styles from "./loader.module.css";

const Loader = ({ loadingText }) => {
  return (
    <div className={styles.loader}>
      <h1 className="text text_type_main-medium">{loadingText}</h1>
      <div className={styles.container}>
        <div className={styles.cssload__loader}>
          <div
            className={`${styles.cssload__inner} ${styles.cssload__one}`}
          ></div>
          <div
            className={`${styles.cssload__inner} ${styles.cssload__two}`}
          ></div>
          <div
            className={`${styles.cssload__inner} ${styles.cssload__three}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

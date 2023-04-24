import styles from "./skeleton.module.css";
import burger from "../../images/burger.png";

const Skeleton = () => {
  return (
    <div className={styles.container}>
      <img src={burger} alt="burger-icon" />
      <h1 className="text text_type_main-default">
        Drop your first ingredient here
      </h1>
    </div>
  );
};

export default Skeleton;

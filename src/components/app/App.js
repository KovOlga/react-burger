import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./app.module.css";

const App = () => {
  return (
    <div>
      <Logo />
      <p className="text text_type_main-medium">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos omnis
        eveniet quibusdam, repudiandae sint nobis minima quidem ipsa ad possimus
        earum sequi doloribus a at eligendi, quaerat ratione, voluptatem
        deserunt!
      </p>
    </div>
  );
};

export default App;

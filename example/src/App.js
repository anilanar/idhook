import React from "react";

import { useUniqueId } from "idhook";

const App = () => {
  const id = useUniqueId();
  return (
    <form>
      <label htmlFor={id("name")}>Name</label>
      <input id={id("name")} name="name" />

      <label htmlFor={id("email")}>Name</label>
      <input id={id("email")} name="email" />
    </form>
  );
};

export default App;

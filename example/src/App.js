import React from "react";

import { useUniqueId } from "idhook";

const App = () => {
  const id = useUniqueId();
  return (
    <form>
      <label htmlFor={id("name")}>Name</label>
      <input name="name" htmlFor={id("name")} />

      <label htmlFor={id("email")}>Name</label>
      <input name="email" htmlFor={id("email")} />
    </form>
  );
};

export default App;

import React from "react";
import { render } from "@testing-library/react";
import App from "./app";

// type TPostData = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// };
// const resData = await fetch("https://jsonplaceholder.typicode.com/posts/1")
//   .then((response) => response.json())
//   .then((json: TPostData) => {
//     console.log("json", json);
//     return json;
//   });

test("renders learn react link", () => {
  render(<App />);
});

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./evn",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("process running on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("DB connection Failed ", err);
  });

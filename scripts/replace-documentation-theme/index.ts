import fs from "fs/promises";

const app = async () => {
    const mainStyleFile = await fs.readFile("./scripts/replace-documentation-theme/style.css", "utf-8");
    const splitStyleFile = await fs.readFile("./scripts/replace-documentation-theme/split.css", "utf-8");
    await fs.writeFile("./docs/assets/style.css", mainStyleFile, "utf-8");
    await fs.writeFile("./docs/assets/split.css", splitStyleFile, "utf-8");
};

app();

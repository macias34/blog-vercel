import fs from "fs";

export const proccessFile = async (request, fileType) => {
  const data = await request.formData();
  const file = await data.get(fileType).arrayBuffer();
  const fileName = data.get("fileName");
  const filePath = data.get("filePath");
  const fileBase64 = Buffer.from(file).toString("base64");

  const siteURL = await request.headers.get("origin");
  const fileSrc = siteURL + `/api/${fileType}/${fileName}`;

  return {
    fileBase64,
    fileName,
    filePath,
    fileSrc,
  };
};

export const saveFile = async (filePath, fileBase64) => {
  await fs.writeFile(filePath, fileBase64, "base64", async (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
};

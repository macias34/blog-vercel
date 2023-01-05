import { sanatizeFile, calculateAspectRatioFit } from "$lib/Helpers/AdminTools";
import { FILEPOST } from "$lib/Helpers/Requests";

const url = "/api/images/upload";

const { default: imageUploader } = await import("quill-image-uploader");
export const { default: Quill } = await import("quill");
Quill.register("modules/imageUploader", imageUploader);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["link", "blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["clean"], // remove formatting button
  ["link", "image"],
];

const setImgAttributes = async (imgUrl, imgHeight, imgWidth) => {
  setTimeout(async () => {
    const img = document.querySelector(`[src="${imgUrl}"]`);

    img.setAttribute("height", imgHeight);
    img.setAttribute("width", imgWidth);
  }, 0);
};

const imageUploadHandler = async (image) => {
  return new Promise(async (resolve, reject) => {
    image = sanatizeFile(image);
    const formData = new FormData();
    formData.append("images", image);
    formData.append("fileName", image.name);
    const img = await FILEPOST(url, formData)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return {
          id: res.img_id,
          url: res.url,
          height: res.height,
          width: res.width,
        };
      });

    resolve(img.url);
    setImgAttributes(img.url, img.height, img.width);
  });
};

export const options = {
  modules: {
    toolbar: toolbarOptions,
    imageUploader: {
      upload: imageUploadHandler,
    },
  },
  theme: "snow",
  placeholder: "Write your story...",
};

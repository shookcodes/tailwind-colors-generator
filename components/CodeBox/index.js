import { MdContentCopy } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

const CodeBox = ({ colorsPalette }) => {
  const colorsObject = `module.exports = {
    theme: {
        colors: { 
            extend: {
              ${colorsPalette
                .map((color, index) => {
                  return `${color.colorPrefix}: {
                  ${color.shades
                    .map((shade, index) => {
                      return `${shade.value}: "${shade.hex}"${
                        color.shades.length > 1 &&
                        index !== color.shades.length - 1
                          ? ", \n                "
                          : "\n            "
                      }`;
                    })
                    .join("")}}${
                    colorsPalette.length > 1 &&
                    index !== colorsPalette.length - 1
                      ? ",\n "
                      : ""
                  }           `;
                })
                .join("")}
            }
        }
    }
}`;

  async function copyText() {
    const copyButton = document.querySelector("#copy-button");
    await navigator.clipboard.writeText(colorsObject);
    const originalInnerHtml = copyButton.innerHTML;
    document.querySelector("#copy-button").innerHTML = "Copied!";
    setTimeout(() => {
      document.querySelector("#copy-button").innerHTML = originalInnerHtml;
    }, 500);
  }

  function downloadFile() {
    const blob = new Blob(colorsPalette, { type: "js" });
    const downloadUrl = window.URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = downloadUrl;
    element.download = "tailwind.config.js";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="relative w-full h-full bg-gray-100 text-gray-800 mt-12 rounded-md shadow-lg border border-gray-200 p-4 md:p-8 text-sm sm:text-base">
      <div className="absolute top-4 right-4 flex justify-end">
        <button
          title="Download"
          className="mr-3 text-gray-500 hover:text-gray-400"
          onClick={downloadFile}
        >
          <FiDownload className="w-6 h-6  " />
        </button>
        <button
          title="Copy to clipboard"
          className="text-gray-500 hover:text-gray-400 text-sm"
          id="copy-button"
          onClick={copyText}
        >
          <MdContentCopy className="w-6 h-6 drop-shadow-md" />
        </button>
      </div>
      {/* whitespace-pre */}
      <pre className="w-full h-full">
        <code>{colorsObject}</code>
      </pre>
    </div>
  );
};

export default CodeBox;

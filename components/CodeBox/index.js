import { MdContentCopy } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

const CodeBox = ({ colorsPalette }) => {
  const colorsObject = `module.exports = {
    theme: {
        colors: { 
            extend: {
              ${colorsPalette
                .map(({ colorPrefix, shades }, index) => {
                  return `${index > 0 ? "" : "  "}${colorPrefix}: {
                  ${shades
                    .map((shade, index) => {
                      return `${index > 0 ? "     " : "  "}${shade.value}: "${
                        shade.hex
                      }"${
                        shades.length > 1 && index !== shades.length - 1
                          ? ",\n               "
                          : "\n               "
                      }`;
                    })
                    .join("")} }${
                    colorsPalette.length > 1 &&
                    index !== colorsPalette.length - 1
                      ? ",\n "
                      : ""
                  }                `;
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
    <div className="relative w-full h-full bg-gray-100 text-slate-700 rounded-md shadow-lg border border-gray-200 z-0 hover:cursor-text ">
      {colorsPalette.length > 0 && (
        // absolute top-4 right-4
        <div className=" sm:absolute top-4 right-4 flex justify-end pt-4 pr-4 sm:p-0 transition-all ease-in">
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
      )}
      {/* whitespace-pre */}
      <pre
        className={`w-full h-full select-text  text-sm sm:text-base p-4 md:p-5 ${
          colorsPalette.length === 0
            ? "whitespace-normal"
            : "overflow-x-scroll sm:overflow-hidden"
        }`}
      >
        <code className={`transition-all ease-in `}>
          {colorsPalette.length > 0
            ? colorsObject
            : "Add a color to generate a tailwind.config file!"}
        </code>
      </pre>
    </div>
  );
};

export default CodeBox;

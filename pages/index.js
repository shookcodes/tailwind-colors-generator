import { useState, useEffect } from "react";
import Head from "next/head";
import ColorGeneratorForm from "../components/ColorGeneratorForm";
import ColorsPalette from "../components/ColorsPalette";
import CodeBox from "../components/CodeBox";
export default function Home() {
  const [colorsPalette, setColorsPalette] = useState([]);
  const [shadeAdded, setShadeAdded] = useState(null);

  return (
    <div>
      <Head>
        <title>Tailwind Colors Generator</title>
        <meta
          name="description"
          content="Generate colors based on the original Tailwind palettes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        id="container"
        className="flex flex-col items-center justify-between h-full w-11/12 mx-auto m-8  bg-gray-50 rounded-lg pt-8  shadow-lg max-w-screen-lg select-none "
      >
        {/* Below div wraps the content so that the top of the menu dropdown overflow is hidden when the menu is open pb-40 is so that shadow is not cut off from open menu due to overflow rules */}
        <div className="w-full h-max  px-4 pb-40 overflow-hidden">
          <div className="w-full flex h-full flex-col items-center mx-auto max-w-3xl  ">
            <ColorGeneratorForm
              colorsPalette={colorsPalette}
              setColorsPalette={setColorsPalette}
              setShadeAdded={setShadeAdded}
            />
            {shadeAdded && (
              <ColorsPalette
                colorsPalette={colorsPalette}
                setColorsPalette={setColorsPalette}
                shadeAdded={shadeAdded}
              />
            )}
            {shadeAdded && (
              <CodeBox colorsPalette={colorsPalette} shadeAdded={shadeAdded} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

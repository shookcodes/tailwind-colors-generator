import Head from "next/head";
import ColorGeneratorForm from "../components/ColorGeneratorForm";
export default function Home() {
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
        className="flex flex-col items-center justify-between h-full w-11/12 mx-auto m-8  bg-gray-50 rounded-lg px-4 py-8  shadow-lg max-w-screen-lg "
      >
        <div className="w-full flex h-full flex-col items-center mx-auto max-w-3xl">
          <ColorGeneratorForm />
          {/* 
          <ColorPreview
            setPaletteArr={setPaletteArr}
            setAlertVisible={setAlertVisible}
          />
          <ColorPalette
            paletteArr={paletteArr}
            textColor={state.textColor}
            handleRemoveColor={handleRemoveColor}
          />
          <CodeBox paletteArr={paletteArr} /> */}
        </div>
      </div>
    </div>
  );
}

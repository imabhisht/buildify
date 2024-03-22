  import * as React from "react";
  import { Component as DefaultComponent } from "./Default.js";

  // GrapesJS Plugins
  import GjsEditor from "@grapesjs/react";
  import gs_tailwind from "grapesjs-tailwind";
  import gs_ga from "grapesjs-ga";
  import gs_ct from "grapesjs-component-twitch";
  import gs_pf from "grapesjs-plugin-forms";

  // Custom Plugin
  import CustomPlugin from "./CustomPlugin.js";
  import "./custom-styles.css"; // Import the custom CSS file



  const gjsOptions = {
    height: "100vh",
    storageManager: false,
    undoManager: { trackSelection: false },
    selectorManager: { componentFirst: true },
    projectData: {
      assets: [
        "https://via.placeholder.com/350x250/78c5d6/fff",
        "https://via.placeholder.com/350x250/459ba8/fff",
        "https://via.placeholder.com/350x250/79c267/fff",
        "https://via.placeholder.com/350x250/c5d647/fff",
        "https://via.placeholder.com/350x250/f28c33/fff",
      ],
      pages: [
        {
          name: "Home page",
          component: DefaultComponent,
        },
      ],
    },
  };


  export default function App() {
    const onEditor = (editor) => {
      console.log("Editor loaded", { editor });
    };

    return (
      <GjsEditor
        grapesjs="https://unpkg.com/grapesjs"
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={gjsOptions}
        plugins={[gs_ga, gs_ct, gs_pf, gs_tailwind,CustomPlugin]}
        onEditor={onEditor}
      />
    );
  }

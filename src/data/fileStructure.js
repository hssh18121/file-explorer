const fileStructure = {
  name: "react-file-explorer",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            { name: "Header.js", type: "file" },
            { name: "Footer.js", type: "file" },
          ],
        },
        { name: "App.js", type: "file" },
        { name: "index.js", type: "file" },
      ],
    },
    {
      name: "public",
      type: "folder",
      children: [
        { name: "index.html", type: "file" },
        { name: "favicon.ico", type: "file" },
      ],
    },
    { name: "data", type: "folder", children: [] },
    { name: "data2", type: "folder", children: [] },
    { name: "README.md", type: "file" },
  ],
};

export default fileStructure;

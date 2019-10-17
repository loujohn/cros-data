module.exports = {
  title: "cors-data",
  base: "/cros-data/",
  description: "一个跨域共享localstorage的库，API支持Promise，支持权限配置",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/"
      },
      {
        text: "指南",
        link: "/guide/"
      },
      {
        text: "Github",
        link: "https://github.com/loujohn/cros-data"
      }
    ],
    sidebarDepth: 2,
    sidebar: {
      "/guide/": ["", "api"]
    }
  }
};

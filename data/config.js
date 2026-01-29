const PRODUCTION_MODE = true;
const appdb = {
  config: {
    subject: "",
    class: "Class 3",
    id: "riz_569",
    totalPages: 32,
    bookWidth: 1259,
    bookHeight: 1646,
    prePages: [
      { pageUrl: "cover.jpg", pageName: "Cover" },
      // { pageUrl: "blank.jpg", pageName: "Blank" },
      // { pageUrl: "blank.jpg", pageName: "Blank" },
      // { pageUrl: "EVS-V_4_page-0004.jpg", pageName: "Blank" },
    ],
  },

  ebook: {
    toc: {
      icon: "fa-book",
      menu: "Table of Contents",
      link: "content",
      data: [
        {
          page: 2,
          title: "1. Living together",
        },
        {
          page: 7,
          title: "2. Exploring our neighbourhood",
        },
      ],
    },
    "Animations": {
      icon: "fa-video-camera",
      menu: "Animations",
      link: "video",
      data: [
        {
          path: "resources/animations/chapter-4.mp4",
          title: "Family and Friends",
          size: "850x480",
          page: 21,
          chapter: "Chapter 4",
        },
      ],
    },
    // "Interactivities.": {
    //   icon: "fa-users",
    //   menu: "Activities",
    //   link: "iframe",
    //   data: [
    //     {
    //       path: "resources/interactivities/fib/chap_1_q_5.html",
    //       title: "Chapter 1, Activity A",
    //       size: "1024x700",
    //       page: 6,
    //     },
    //     {
    //       path: "resources/interactivities/fib/chap_1_q_7.html",
    //       title: "Chapter 1, Activity B",
    //       size: "1024x650",
    //       page: 7,
    //     },
    //     {
    //       path: "resources/interactivities/fib/chap_1_q_8.html",
    //       title: "Chapter 1, Activity C",
    //       size: "1024x800",
    //       page: 7,
    //     },
    //     {
    //       path: "resources/interactivities/fib/chap_2_q_1.html",
    //       title: "Chapter 1, Activity D",
    //       size: "1024x600",
    //       page: 9,
    //     },
    //     {
    //       path: "resources/interactivities/true-false/chap_2_q_3.html",
    //       title: "Chapter 1, Activity E",
    //       size: "1024x750",
    //       page: 10,
    //     },
    //     {
    //       path: "resources/interactivities/true-false/chap_2_q_4.html",
    //       title: "Chapter 1, Activity F",
    //       size: "1024x1000",
    //       page: 10,
    //     },
    //   ],
    // },
    // "Games.": {
    //   icon: "fa-users",
    //   menu: "Games",
    //   link: "iframe",
    //   data: [
    // {
    //   path: "",
    //   title: "Coming Soon",
    //   size: "1024x800",
    //   page: "",
    // },
    // {
    //   path: "resources/interactivities/fib/chap_2_fib_1.html",
    //   title: "Chapter 1, Activity A",
    //   size: "1100x900",
    //   page: 22,
    // },
    //   ],
    // },
    // "Test Paper Generator.": {
    //   icon: "fa-users",
    //   menu: "Test Paper Generator",
    //   link: "iframe",
    //   data: [
    // {
    //   path: "",
    //   title: "Coming Soon",
    //   size: "1024x800",
    //   page: "",
    // },
    // {
    //   path: "resources/interactivities/fib/chap_2_fib_1.html",
    //   title: "Chapter 1, Activity A",
    //   size: "1100x900",
    //   page: 22,
    // },
    //   ],
    // },

    zother: [],
  },
};

var TOOLS_OPTIONS = {
  sidebar: {
    activate: true,
    id: "tool-sidebar",
  },
  notes: {
    activate: true,
    id: "ebook-addnote",
  },
  zoomin: {
    activate: true,
    id: "tool-zoom-in",
  },
  zoomout: {
    activate: true,
    id: "tool-zoom-out",
  },
  mode: {
    activate: true,
    id: "tool-bookmode-single-double",
  },
  fullscreen: {
    activate: true,
    id: "tool-fullscreen",
  },
  assetmode: {
    activate: true,
    id: "app-btn-toggleres",
  },
  spotlight: {
    activate: true,
    id: "app-btn-spotlight",
  },
  backgroundmusic: {
    activate: true,
    id: "tool-backgroundmusic",
  },
  pen: {
    activate: true,
    id: "app-tool-pen",
  },
  highlighter: {
    activate: true,
    id: "app-tool-highlight",
  },
  thumbnail: {
    activate: true,
    id: "app-tool-thumbnail",
  },
  glossary: {
    activate: false,
    id: "app-btn-glossary",
  },
  bookmarkslist: {
    activate: true,
    id: "app-list-bookmark",
  },
  highlightsList: {
    activate: true,
    id: "app-list-highlights",
  },
  notesList: {
    activate: true,
    id: "app-list-notes",
  },
};
